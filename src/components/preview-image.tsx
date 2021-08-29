import React, { SyntheticEvent, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  img: {
    border: '1px solid #ddd',
    borderRadius: 4,
    padding: 5,
    width: 300,
    '&:hover': {
      boxShadow: '0 0 2px 1px rgba(0, 140, 186, 0.5)',
    },
  },
}));

interface PreviewImageProps {
  src: string;
  onLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
}

const PreviewImage = (props: PreviewImageProps) => {
  const { src, onLoad } = props;
  const classes = useStyles();

  return (
    <div>
      <img
        id="img"
        className={classes.img}
        src={src}
        width={300}
        height={300}
        onLoad={onLoad}
      />
    </div>
  );
};

export default PreviewImage;
