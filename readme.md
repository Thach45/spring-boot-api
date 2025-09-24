
## API Endpoints

### Categories
- GET `/api/categories` - Lấy danh sách danh mục
- GET `/api/categories/{id}` - Lấy chi tiết danh mục
- POST `/api/categories` - Tạo danh mục mới
- PUT `/api/categories/{id}` - Cập nhật danh mục
- DELETE `/api/categories/{id}` - Xóa danh mục

### Products
- GET `/api/products` - Lấy danh sách sản phẩm
- GET `/api/products/{id}` - Lấy chi tiết sản phẩm
- GET `/api/products/category/{categoryId}` - Lấy sản phẩm theo danh mục
- POST `/api/products` - Tạo sản phẩm mới
- PUT `/api/products/{id}` - Cập nhật sản phẩm
- DELETE `/api/products/{id}` - Xóa sản phẩm

## Tài liệu API

Swagger UI được tích hợp để cung cấp tài liệu API tương tác:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI Docs: `http://localhost:8080/api-docs`

## Giao diện người dùng

Truy cập giao diện web tại: `http://localhost:8080`

Giao diện được xây dựng với:
- Bootstrap 5 cho UI components
- AJAX/Fetch API cho tương tác với backend
- Responsive design cho trải nghiệm mobile

## Cấu trúc dự án

```
demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/spring_api/demo/
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── dto/
│   │   │       ├── entity/
│   │   │       ├── repository/
│   │   │       ├── service/
│   │   │       └── DemoApplication.java
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── js/
│   │       │   └── index.html
│   │       └── application.properties
│   └── test/
├── pom.xml
└── GITME.md
```