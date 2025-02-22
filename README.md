## Case Study 1
### Issue
The issue is caused by **directly mutating the state**:
```tsx
const updateAge = () => {
    user.age = 26
    setUser(user)
};
``` 
According to the React documentation: 
> In React, state is considered read-only, so you should replace it rather than mutate your existing objects. 

In this case, since `user` is modified directly, `setUser(user)` does not detect any change, and React does not re-render the component.

### Solution
Instead, **create a new object** to replace the original `user`.
```tsx
const updateAge = () => {
    setUser(prevUser => ({ ...prevUser, age: 26 }));
};
```
`{ ...prevUser, age: 26 }` creates a **new object**, so React detects the change and re-renders the component.

## Case Study 2
### Issue
The issue is caused by **direct mutation of the object** inside the state array. The same reference (`users`) is passed to `setUsers`, so React **does not detect a state change**.
```tsx
const updateUser = (id, newName) => {
    const user = users.find(u => u.id === id)
    user.name = newName
    setUsers(users)
};
```
**React determines if state has changed based on object identity** (`===`). Since `setUsers(users)` keeps the same reference, React assumes nothing changed (because objects are compared by reference, not by value) and skips rendering. 

### Solution
Use `map()` to **return a new array** and ensure state immutability:
```tsx
const updateUser = (id, newName) => {
    setUsers(prevUsers =>
        prevUsers.map(user =>
            user.id === id ? { ...user, name: newName } : user
        )
    );
};
```
`map()` creates a **new array**, ensuring React detects the change. `{ ...user, name: newName }` creates a **new object**, avoiding mutation.

## Case Study 3
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Running the App locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

To create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

To start the production build:
```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

### Delete Functionality
A **"Delete"** button is added next to each user's name. When this button is pressed:

1. The `deleteUser` function is triggered, receiving the `id` of the user to be removed.
2. Inside `deleteUser`, the `setUsers` function is called with a **filtered list**, excluding the user with the given `id`.
3. Since `filter()` **returns a new array**, React detects the state change and re-renders the component.
4. The deleted user is removed from the UI instantly without requiring a page refresh.

```tsx
const deleteUser = (id: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
};
```