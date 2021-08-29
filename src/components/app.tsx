import React, { SyntheticEvent, useCallback, useRef, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import { classifyImage, ErrorType } from '../services';
import PreviewImage from './preview-image';
import { IImage } from '../models';
import { fetchRandomDogs } from '../api';
import Gallery from './gallery';
import { makeStyles } from '@material-ui/core';
import { errorMap } from '../services';
interface IAppProps {
  pageSize: number;
}

enum Status {
  None = 1,
  Loading,
  Success,
  Failed,
}

const useStyles = makeStyles((theme) => ({
  error: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold'
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const App = (props: IAppProps) => {
  const { pageSize } = props;
  const [imageSrc, setImageSrc] = useState('');
  const apiPathRef = useRef('');
  const [images, setImages] = useState<IImage[]>([]);
  const [status, setStatus] = useState(Status.None);
  const [error, setError] = useState<ErrorType>('');
  const classes = useStyles();
  
  const fetchData = async (imgs: IImage[] = []) => {
    const dogImages = await fetchRandomDogs(apiPathRef.current, pageSize);
    setImages([...imgs, ...dogImages]);
  };

  const onImageLoaded = useCallback(
    async (event: SyntheticEvent<HTMLImageElement>) => {
      setStatus(Status.Loading);
      try {
        const path = await classifyImage(event.target as HTMLImageElement);
        apiPathRef.current = path;
        fetchData();
        setStatus(Status.Success);
      } catch (error) {
        setStatus(Status.Failed);
        setError(error);
      }
    },
    [fetchData, setStatus, setImages, pageSize]
  );

  const loadMoreItems = useCallback(() => {
    setStatus(Status.Loading);
    try {
      fetchData(images);
      setStatus(Status.Success);
    } catch (error) {
      setStatus(Status.Failed);
    }
  }, [setStatus, fetchData, pageSize]);

  const onImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const img = event.target.files[0];
        setImageSrc(URL.createObjectURL(img));
      }
    },
    [setImageSrc],
  );

  return (
    <div>
      {imageSrc && <PreviewImage src={imageSrc} onLoad={onImageLoaded} />}
      <h1>Select Image</h1>
      { status === Status.Loading && (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      )}
      <input type="file" name="myImage" onChange={onImageChange} />
      {status === Status.Failed && (
        <div className={classes.error}>{ errorMap[error] }</div>
      )}
      { images.length === 0 && status === Status.Failed && (
      <div>
        No gallery to display
        </div>
        )}
      <Gallery images={images} onNext={loadMoreItems} />
    </div>
  );
};

export default App;
