import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '../components/rating/Rating';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({product}) {
  const navigate = useNavigate()
  const redirectToProductPage = () => {
    navigate(`/product/${product.id}`)
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt="product image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
          onClick={redirectToProductPage}
          >
            {product.product_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {product.product_description}
          </Typography>
          {/* here goes the rating component */}
          <Rating value={product.rating} text={`${product.textReviews} reviews`}/>
          <Typography variant="body2" color="text.secondary">
            Rs.{product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
