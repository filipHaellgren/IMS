# Product Management API

This is a **RESTful API** built using **Node.js**, **Express**, **TypeScript**, **Mongoose**, and **Bun**. The API enables comprehensive management of products, including creating, updating, deleting, and retrieving product details.

---

### Bun

- **Bun bundler**: [Bun docs and installation](https://bun.sh/).

### Dependencies

- **express**: A web framework for Node.js.
- **express-validator**: Middleware for validating and sanitizing request data.
- **mongoose**: MongoDB object modeling for Node.js.
- **dotenv**: For loading environment variables from a `.env` file.

### Dev Dependencies

- **nodemon**: Automatically restarts the server when file changes are detected.
- **ts-node**: TypeScript execution environment for Node.js.
- **@types/express**: TypeScript type definitions for Express.
- **@types/mongoose**: TypeScript type definitions for Mongoose.
- **@types/bun**: TypeScript type definitions for Bun.

### Peer Dependencies

- **typescript**: TypeScript language support to compile `.ts` files.

## Copy-Paste Terminal Command to Install Dependencies

```bun
bun add express express-validator mongoose dotenv && \
bun add nodemon ts-node @types/express @types/mongoose @types/bun typescript --dev
```

```npm
npm install express express-validator mongoose dotenv && \
npm install --save-dev nodemon ts-node @types/express @types/mongoose @types/bun typescript
```

---

## Models

### Product Model (`models/Product.ts`)

```ts
interface Contact {
  name: string;
  email: string;
  phone: string;
}

interface Manufacturer {
  name: string;
  contactInfo: Contact;
}

export interface Product extends Document {
  name: string;
  sku: string;
  price: number;
  amountInStock: number;
  category: string;
  manufacturer: Manufacturer;
}

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const ManufacturerSchema: Schema = new Schema({
  name: { type: String, required: true },
  contactInfo: { type: ContactSchema, required: true },
});

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  amountInStock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  manufacturer: { type: ManufacturerSchema, required: true },
});
```

## API Endpoints

### 1. **`GET` /api/products**

Retrieve a list of all products, including their manufacturer and contact information. You can filter products by category, manufacturer, and stock availability.

**Query Parameters**:

- `category` (optional): Filter products by category (case-insensitive).
- `manufacturer` (optional): Filter products by manufacturer (case-insensitive).
- `inStock` (optional):
  - `true`: Products with more than 1 item in stock.
  - `false`: Products with less than 1 item in stock.

---

### 2. **`GET` /api/products/:id**

Retrieve details of a single product by its ID, including its manufacturer and contact information.

---

### 3. **`POST` /api/products**

Create a new product.

**Request Body Example**:

```json
{
  "name": "Product Name",
  "sku": "12345",
  "price": 1500,
  "amountInStock": 10,
  "category": "electronics",
  "manufacturer": {
    "name": "Manufacturer Name",
    "contactInfo": {
      "name": "Contact Name",
      "phone": "123-456-7890",
      "email": "contact@example.com"
    }
  }
}
```

---

### 4. **`PUT` /api/products/:id**

Update an existing product by its ID.

---

### 5. **`DELETE` /api/products/:id**

Delete a product by its ID.

---

### 6. **`GET` /api/products/total-stock-value**

Summarize the total value of all products in stock.

This endpoint calculates the total stock value by multiplying each product’s price by its quantity in stock (`amountInStock`).

---

### 7. **`GET` /api/products/total-stock-value-by-manufacturer**

Summarize the total value of products in stock per manufacturer.

This endpoint returns the total stock value of products grouped by manufacturer.

---

### 8. **`GET` /api/products/low-stock**

Retrieve a list of all products with less than 10 units in stock.

---

### 9. **`GET` /api/products/critical-stock**

Retrieve a compact list of products with less than 5 items in stock. The response includes only the manufacturer’s name and contact information (name, phone, and email).

---

### 10. **`GET` /api/manufacturers**

Retrieve a list of all manufacturers the company does business with.

---

## Importing Thunder Client Collection

To import the provided Thunder Client collection:

1. Open **Thunder Client** in VS Code.
2. Go to the **Collections** tab.
3. Click the three-dot menu (`...`) and select **Import**.
4. Choose the JSON file located at `./rest-server/IMS-RESTful-thunder-collection.json`.
5. The collection will be imported and ready to use.

### [Download IMS-RESTful-thunder-collection.json](./IMS-RESTful-thunder-collection.json)

---
