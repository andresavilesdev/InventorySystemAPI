package com.andres.inventorysystemapi.products.model;

import com.andres.inventorysystemapi.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product extends BaseEntity{

    @Column(length = 100,  nullable = false)
    private String productName;

    @Column(length = 300,  nullable = false)
    private String productDescription;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal productPrice;

    @Column(length = 50, nullable = false)
    private String productCategory;

    @Column(nullable = false)
    private Integer productStock;

}
