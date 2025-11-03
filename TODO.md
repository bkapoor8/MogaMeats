# TODO: Implement Admin Notifications for New Orders

- [x] Import User model in /api/checkout/route.ts
- [x] After order creation, query for admin users using User.find({ isAdmin: true })
- [x] Create notifications for each admin with appropriate title and body
- [x] Modify Header.tsx to play sound only on new notifications (not on page load)
- [ ] Test the implementation by placing a new order and checking admin notifications
