import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IImage } from '../models';

const useStyles = makeStyles(() => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 25%)',
    gridTemplateRows: 'repeat(3, 278px)',
  },
  gridItem: {
    border: 'thin gray solid',
    padding: 10,
  },
  img: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
}));

const Gallery = ({
  images,
  onNext,
}: {
  images: IImage[];
  onNext: () => void;
}) => {
  const classes = useStyles();

  return (
    <div>
      <section>
        <div>
          <InfiniteScroll
            className={classes.grid}
            dataLength={images.length}
            next={onNext}
            hasMore={true}
            loader={<div />}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {images.map(image => (
              <div key={image.id} className={classes.gridItem}>
                <img className={classes.img} src={image.src} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
