package com.andres.inventorysystemapi.products.services;

import com.andres.inventorysystemapi.products.dto.InProductDto;
import com.andres.inventorysystemapi.products.model.Product;

import java.util.List;

public interface IProductService {

    List<Product> getProducts();

    Product getProductById(Long productId);

    void deleteProductById(Long productId);

    Product saveProduct(InProductDto inProductDto);

    Product saveProductE(Product product);

}
