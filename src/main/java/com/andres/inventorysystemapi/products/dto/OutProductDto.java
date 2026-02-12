package com.andres.inventorysystemapi.products.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OutProductDto {

    private Long id;
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private String productCategory;
    private Integer productStock;
    private LocalDateTime createdAt;

}
