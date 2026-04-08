# E-Commerce User-Specific Data & Profile Image - Testing Guide

## Changes Implemented

### 1. Profile Image Upload Functionality
- Users can now upload and update their profile images
- Image stored as base64 in database (can be integrated with Cloudinary in production)

### 2. User-Specific Orders
- Orders are now linked to specific users via `user` and `userEmail` fields
- Frontend uses `/order/my-orders` endpoint to fetch only current user's orders
- Admin can still view all orders via `/order` endpoint

### 3. User-Specific Cart
- Cart data stored per user in localStorage using key pattern: `cart_{userId}`
- Guest users have their own temporary cart using `guestCartId`
- On login, guest cart automatically merges with user's existing cart

## Testing Instructions

### Prerequisites
1. Backend server running on `http://localhost:5000`
2. Frontend app running on `http://localhost:5173` (or your dev port)
3. MongoDB connection established
4. At least one user account created

### Test Case 1: Profile Image Upload
1. Login to your account
2. Navigate to Profile page
3. Click the camera icon on the profile picture
4. Select an image file (JPG, PNG, etc.)
5. Click "Save" in the edit form if needed
6. Verify:
   - Image uploads successfully
   - Alert shows "Profile image updated successfully!"
   - Profile picture updates in the UI
   - Refresh page - image persists

### Test Case 2: User-Specific Orders
1. Create two different user accounts (User A and User B)
2. Login as User A
3. Place an order (complete checkout)
4. Logout
5. Login as User B
6. Place a different order
7. Navigate to Orders page for both users
8. Verify:
   - User A sees only their own orders
   - User B sees only their own orders
   - No cross-visibility of orders

### Test Case 3: User-Specific Cart
1. Open the app in incognito/private window (or logout)
2. Add some products to cart
3. Note the cart items and count
4. Login with a user account
5. Verify:
   - Cart from incognito/guest session merges with user's cart (if they had existing items)
   - New items added while logged in are saved to user's cart
6. Add more items to cart
7. Logout
8. Login with a different user account
9. Verify:
   - The previous user's cart items are NOT visible
   - Each user has their own separate cart

### Test Case 4: Backend Order Data
1. Check MongoDB `orders` collection
2. Verify each order document has:
   - `user` field (ObjectId reference to User)
   - `userEmail` field (string)
3. Verify these fields match the user who placed the order

### Test Case 5: Profile Edit
1. Go to Profile page
2. Click "Edit Profile"
3. Change Full Name and/or Phone Number
4. Click Save
5. Verify:
   - Changes are saved to database
   - Profile displays updated information
   - Email field is disabled (cannot be changed)

## API Endpoints to Verify

### New/Modified Endpoints:
- `GET /profile` - Returns user data including profileImage
- `PUT /profile` - Updates user profile (name, phone)
- `POST /profile/upload-image` - Uploads profile image
- `GET /order/my-orders` - Fetches orders for current authenticated user only

## Database Migrations

If you have existing orders without user references, you may need to:
1. Update existing orders to assign them to users (matching by email or other criteria)
2. Or create a script to handle legacy orders

## Notes

- For production image uploads, integrate Cloudinary or S3 instead of base64
- Consider adding image compression before upload
- Add pagination support for orders if not already present
- Implement proper error handling for image uploads (file size, type validation)
- Test cart merging behavior thoroughly with different scenarios

## Quick Test Commands

```bash
# Start backend
cd backend
npm start

# Start frontend
cd e-commerce
npm run dev

# Check MongoDB
mongosh
use ecommerce
db.users.find()
db.orders.find()