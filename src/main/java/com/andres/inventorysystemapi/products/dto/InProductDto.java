package com.andres.inventorysystemapi.products.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InProductDto {

    @NotBlank(message = "Product name is required")
    @Size(min = 1, max = 100, message = "Product name must be between 1 and 100 characters")
    private String productName;

    @Size(max = 300, message = "Product description cannot exceed 300 characters")
    private String productDescription;

    @NotNull(message = "Product price is required")
    @Positive(message = "Product price must be greater than 0")
    @Digits(integer = 10, fraction = 2)
    private BigDecimal productPrice;

    @NotBlank(message = "Product category is required")
    private String productCategory;

    @NotNull(message = "Product stock is required")
    @PositiveOrZero(message = "Product stock cannot be negative")
    private Integer productStock;

}
