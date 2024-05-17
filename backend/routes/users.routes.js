import 
{   loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser} from '../controllers/users.controllers.js'
import express from 'express'
import { adminCheck , validateToken } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/' , registerUser)
router.get('/' , validateToken , adminCheck , getUsers)
router.post('/logout' , logoutUser)
router.post('/login' , loginUser)
router.get('/profile' , validateToken , getUserProfile)
router.put('/profile' , validateToken , updateUserProfile)
router.delete('/:id' , validateToken , adminCheck , deleteUser)
router.get('/:id' , validateToken , adminCheck , getUserById)
router.put('/:id' , validateToken , adminCheck , updateUser)

export default router