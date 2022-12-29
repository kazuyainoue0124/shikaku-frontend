import { Grid } from '@mui/material'
import PostList from 'src/components/PostList'
import Sidebar from 'src/components/Sidebar'

export default function Home() {
  return (
    <Grid container spacing={3}>
      <PostList />
      <Sidebar />
    </Grid>
  )
}
