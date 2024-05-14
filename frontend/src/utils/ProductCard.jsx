import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '../components/rating/Rating';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ProductCard({product}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.imageURL}
          alt="product image"
        />
        <CardContent>
        <Link to={`/products/${product._id}`}><Typography gutterBottom variant="h5" component="div" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
          >
            {product.name}
          </Typography></Link>
          <Typography variant="body2" color="text.secondary" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {product.description}
          </Typography>
          {/* here goes the rating component */}
          <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
          <Typography variant="body2" color="text.secondary">
            Rs.{product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
