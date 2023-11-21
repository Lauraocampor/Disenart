// @PUT /products/:id/editProduct
updateProduct: async (req, res) => {

    // busco el producto para poder volver a mandar la vista edit en caso de error
    const product = await Product.findByPk(req.params.id, {
        raw: true,
        include: ['size', 'colour'],
        nest: true,
    });

    // convierto en array la columna de imagenes para poder hacer el forEach en la vista
    product.image_product = JSON.parse(product.image_product);
    
    // busco los colores y talles para poder volver a mandar la vista edit en caso de error
    const sizes = await Size.findAll({ raw: true });
    const colours = await Colour.findAll({ raw: true });

    // hago las validaciones 
    const resultValidation = validationResult(req);


    if (resultValidation.errors.length > 0) {
        return res.render('editProduct', {product, 
            sizes,
            colours,
            errors: resultValidation.mapped(),
            oldData: req.body,
            user: req.session.userLogged,
        });
    }

    const filenames = req.files.map((file) => file.filename);

    if (filenames.length > 4) {
        return res.render('editProduct', {
          product,
          sizes,
          colours,
          errors: {
            productImages: {
              msg: 'Solo se permiten hasta 4 imágenes.',
            },
          },
          oldData: req.body,
          user: req.session.userLogged,
        });
      }

    // cantidad de imgs que cargo el usuario
    const numUserImages = filenames.length;

    try {
        //busca el producto
        const existingProduct = await Product.findOne({
            where: {
                id_product: req.params.id,
            },
        });

        if (existingProduct) {
            const existingImages = JSON.parse(existingProduct.image_product);
            const maxImagesToKeep = 4; // maximo 4 imagenes por producto

            // cuantas imgs se mantienen y cuantas se actualizan
            const numImagesToKeep = Math.max(0, maxImagesToKeep - numUserImages);
            const imagesToKeep = existingImages.slice(-numImagesToKeep);
            const imagesToUpdate = filenames.slice(0, maxImagesToKeep);

            const updatedImages = imagesToKeep.concat(imagesToUpdate);
            const updatedProduct = {
                name_product: req.body.productName,
                colour_id: Number(req.body.productColor),
                size_id: Number(req.body.productSize),
                price_product: (req.body.productPrice),
                quantity_product: req.body.productStock,
                description_product: req.body.productDescription,
                image_product: JSON.stringify(updatedImages),
            };

            await Product.update(updatedProduct, {
                where: {
                    id_product: req.params.id,
                },
            });
            //console.log(updatedProduct)

            // Redirige al producto actualizado
            res.redirect('/products/' + req.params.id + '/details');
        }
    } catch (error) {
        console.log(error);
    }
}

//
// @PUT /products/:id/editProduct
updateProduct: async (req, res) => {

    // busco el producto para poder volver a mandar la vista edit en caso de error
    const product = await Product.findByPk(req.params.id, {
        raw: true,
        include: ['size', 'colour'],
        nest: true,
    });

    // convierto en array la columna de imagenes para poder hacer el forEach en la vista
    product.image_product = JSON.parse(product.image_product);
    
    // busco los colores y talles para poder volver a mandar la vista edit en caso de error
    const sizes = await Size.findAll({ raw: true });
    const colours = await Colour.findAll({ raw: true });

    // hago las validaciones 
    const resultValidation = validationResult(req);


    if (resultValidation.errors.length > 0) {
        return res.render('editProduct', {product, 
            sizes,
            colours,
            errors: resultValidation.mapped(),
            oldData: req.body,
            user: req.session.userLogged,
        });
    }

    const filenames = req.files.map((file) => file.filename);

    // cantidad de imgs que cargo el usuario
    const numUserImages = filenames.length;
    

    try {
        //busca el producto
        const existingProduct = await Product.findOne({
            where: {
                id_product: req.params.id,
            },
        });

        if (existingProduct) {
            const existingImages = JSON.parse(existingProduct.image_product);
            const maxImagesToKeep = 4; // maximo 4 imagenes por producto

            // cuantas imgs se mantienen y cuantas se actualizan
            const numImagesToKeep = Math.max(0, maxImagesToKeep - numUserImages);
            const imagesToKeep = existingImages.slice(-numImagesToKeep);
            const imagesToUpdate = filenames.slice(0, maxImagesToKeep);

            const updatedImages = imagesToKeep.concat(imagesToUpdate);
            const updatedProduct = {
                name_product: req.body.productName,
                colour_id: Number(req.body.productColor),
                size_id: Number(req.body.productSize),
                price_product: (req.body.productPrice),
                quantity_product: req.body.productStock,
                description_product: req.body.productDescription,
                image_product: JSON.stringify(updatedImages),
            };

            await Product.update(updatedProduct, {
                where: {
                    id_product: req.params.id,
                },
            });
            //console.log(updatedProduct)

            // Redirige al producto actualizado
            res.redirect('/products/' + req.params.id + '/details');
        }
    } catch (error) {
        console.log(error);
    }
},
