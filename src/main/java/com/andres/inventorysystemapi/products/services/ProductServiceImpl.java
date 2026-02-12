package com.andres.inventorysystemapi.products.services;

import com.andres.inventorysystemapi.products.dto.InProductDto;
import com.andres.inventorysystemapi.products.mapper.ProductMapper;
import com.andres.inventorysystemapi.products.model.Product;
import com.andres.inventorysystemapi.products.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements IProductService{

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    public Product saveProduct(InProductDto inProductDto) {

        Product product = productMapper.toEntity(inProductDto);

        return productRepository.save(product);
    }

    @Override
    public Product saveProductE( Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getProducts() {

        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElseThrow();
    }

    @Override
    public void deleteProductById(Long productId) {
        productRepository.deleteById(productId);
    }


}
