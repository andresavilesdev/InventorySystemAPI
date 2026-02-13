package com.andres.inventorysystemapi.products.controllers;

import com.andres.inventorysystemapi.products.dto.InProductDto;
import com.andres.inventorysystemapi.products.dto.OutProductDto;
import com.andres.inventorysystemapi.products.mapper.ProductMapper;
import com.andres.inventorysystemapi.products.model.Product;
import com.andres.inventorysystemapi.products.services.IProductService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final IProductService productService;
    private final ProductMapper productMapper;

    public ProductController(IProductService productService, ProductMapper productMapper) {
        this.productService = productService;
        this.productMapper = productMapper;
    }

    @PostMapping
    public ResponseEntity<OutProductDto> saveProduct(@Valid @RequestBody InProductDto inProductDto) {
        Product savedProduct = productService.saveProduct(inProductDto);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedProduct.getId())
                .toUri();

        return ResponseEntity.created(location).body(productMapper.toDto(savedProduct));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OutProductDto> getProductById(@Valid @PathVariable Long id) {



        return ResponseEntity.ok(productMapper.toDto(productService.getProductById(id)));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<OutProductDto> updateProduct(
            @Valid @RequestBody InProductDto inProductDto,
            @PathVariable Long id) {

        Product existingProduct = productService.getProductById(id);
        productMapper.updateFromDto(inProductDto, existingProduct);


        Product updatedProduct = productService.saveProductE(existingProduct);


        return ResponseEntity.ok(productMapper.toDto(updatedProduct));


    }

    @GetMapping
    public ResponseEntity<List<OutProductDto>> finAllProducts(){

        List<OutProductDto> productList = productService.getProducts()
                .stream()
                .map(productMapper::toDto)
                .toList();

        return ResponseEntity.ok(productList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        productService.deleteProductById(id);
        return ResponseEntity.ok("Product with id:" + id + " have been deleted");
    }


}
