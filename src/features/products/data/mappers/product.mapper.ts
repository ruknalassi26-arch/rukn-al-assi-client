import {
  PaginatedProductsEntity,
  ProductListItemEntity,
  ProductCategoryEntity,
} from "../../domain/entities/product.entity";
import { ProductDetailEntity } from "../../domain/entities/product-detail.entity";
import {
  RpcProductsResponseDto,
  RpcProductDetailResponseDto,
  RpcProductCategoryDto,
} from "../dto/product.dto";

export class ProductMapper {
  static toCategoryEntity(dto: RpcProductCategoryDto): ProductCategoryEntity {
    return {
      id: dto.id,
      name: dto.name || "Category",
      slug: dto.slug || "",
      description: dto.description || null,
      imageUrl: dto.imageUrl || null,
      sortOrder: dto.sortOrder || 0,
    };
  }

  static toPaginatedProductsEntity(dto: RpcProductsResponseDto): PaginatedProductsEntity {
    const rawItems = dto?.items || [];
    const items: ProductListItemEntity[] = rawItems.map((item) => ({
      id: item.id,
      name: item.name || "Industrial Product",
      slug: item.slug || item.id,
      sku: item.sku || null,
      shortDescription: item.shortDescription || null,
      datasheetUrl: item.datasheetUrl || null,
      isFeatured: !!item.isFeatured,
      featuredOrder: item.featuredOrder ?? null,
      primaryImage: item.primaryImage
        ? {
            id: item.primaryImage.id || item.id,
            imageUrl: item.primaryImage.imageUrl,
            mimeType: item.primaryImage.mimeType || null,
            sortOrder: item.primaryImage.sortOrder || 0,
          }
        : null,
      category: item.category ? this.toCategoryEntity(item.category) : null,
    }));

    const total = dto?.pagination?.total ?? items.length;
    const page = dto?.pagination?.page ?? 1;
    const pageSize = dto?.pagination?.pageSize ?? 12;
    const totalPages = dto?.pagination?.totalPages ?? Math.ceil(total / pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  static toProductDetailEntity(dto: RpcProductDetailResponseDto): ProductDetailEntity {
    return {
      id: dto.id,
      name: dto.name || "Industrial Product",
      slug: dto.slug || dto.id,
      sku: dto.sku || null,
      shortDescription: dto.shortDescription || null,
      datasheetUrl: dto.datasheetUrl || null,
      isFeatured: !!dto.isFeatured,
      specifications: dto.specifications || {},
      category: dto.category ? this.toCategoryEntity(dto.category) : null,
      images: (dto.images || []).map((img) => ({
        id: img.id,
        imageUrl: img.imageUrl,
        mimeType: img.mimeType || null,
        isPrimary: !!img.isPrimary,
        sortOrder: img.sortOrder || 0,
      })),
      relatedProducts: (dto.relatedProducts || []).map((rp) => ({
        id: rp.id,
        name: rp.name || "Related Product",
        slug: rp.slug || rp.id,
        shortDescription: rp.shortDescription || null,
        primaryImage: rp.primaryImage || null,
      })),
    };
  }
}
