import { Router } from "express";
import multer from "multer";
import { addCategory, addProduct, deleteProduct, getProduct, updateProduct } from "../controllers/productController.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const upload = multer({storage: storage});

const router = Router();


router.get('/shop', getProduct);

router.post('/newproduct', upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'brandImg', maxCount: 1 }
]), addProduct);

router.put('/updateproduct/:id', upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'brandImg', maxCount: 1 }
]), updateProduct);

router.post('/category', addCategory);

router.delete('/deleteproduct/:id', deleteProduct);


export default router;