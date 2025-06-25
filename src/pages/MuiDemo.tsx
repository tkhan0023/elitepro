import { Button, Card, CardContent, Typography, IconButton, Chip, List, ListItem } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function MuiDemo() {
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
      <Typography variant="h4">Material 3 Demo</Typography>
      <Button variant="contained" color="primary">Material 3 Button</Button>
      <Card style={{ width: 320 }}>
        <CardContent>
          <Typography variant="h6">Material 3 Card</Typography>
          <Typography variant="body2">Hover over this card to see the lift effect.</Typography>
        </CardContent>
      </Card>
      <IconButton color="primary">
        <FavoriteIcon />
      </IconButton>
      <Chip label="Material 3 Chip" color="primary" />
      <List style={{ width: 320 }}>
        <ListItem button>Material 3 List Item</ListItem>
        <ListItem button>Another List Item</ListItem>
      </List>
    </div>
  );
} 