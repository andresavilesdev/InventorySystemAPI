package com.andres.inventorysystemapi.products.mapper;

import com.andres.inventorysystemapi.products.dto.InProductDto;
import com.andres.inventorysystemapi.products.dto.OutProductDto;
import com.andres.inventorysystemapi.products.model.Product;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    private final ModelMapper modelMapper;

    public ProductMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public Product toEntity(InProductDto dto) {
        return modelMapper.map(dto, Product.class);
    }

    public OutProductDto toDto(Product product) {
        return modelMapper.map(product, OutProductDto.class);
    }

    public void updateFromDto(InProductDto dto, Product entity) {
        modelMapper.map(dto, entity);
    }

}
