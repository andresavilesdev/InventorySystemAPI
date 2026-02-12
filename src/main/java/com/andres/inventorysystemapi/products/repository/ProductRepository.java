package com.andres.inventorysystemapi.products.repository;

import com.andres.inventorysystemapi.products.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
