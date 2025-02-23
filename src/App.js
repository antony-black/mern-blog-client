import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/posts/single/:id' element={<FullPost/>}/>
        <Route path='/posts/create' element={<AddPost/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/register' element={<Registration/>}/>
      </Routes>
      </Container>
    </>
  );
}

export default App;
