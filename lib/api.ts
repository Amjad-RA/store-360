// Mock API functions to fetch data

// Sample data with timestamps added
const SAMPLE_DATA = [
  {
    Order_ID: 1001,
    Customer_Name: "John Smith",
    Customer_Phone: "555-1234",
    Customer_Address: "123 Main St",
    Items: [
      {
        Item_Name: "Pepperoni Pizza",
        Item_Price: 10.99,
        Item_Type: "Food",
        Quantity: 1,
        Rating: "4",
        Total_Price: 10.99,
      },
      {
        Item_Name: "Garlic Bread",
        Item_Price: 5.99,
        Quantity: 2,
        Total_Price: 11.98,
      },
      {
        Item_Name: "Soft Drink",
        Item_Price: 2.49,
        Item_Type: "Beverage",
        Quantity: 1,
        Total_Price: 2.49,
      },
    ],
    Order_Type: "Online",
    Order_Status: "Delivered",
    Delivery_Person: "Sarah Johnson",
    Delivery_Status: "Delivered",
    Timestamp: "2023-03-01T10:30:00Z",
  },
  {
    Order_ID: 1002,
    Customer_Name: "Alice Johnson",
    Customer_Phone: "555-5678",
    Customer_Address: "456 Elm St",
    Items: [
      {
        Item_Name: "Cheeseburger",
        Item_Price: 8.99,
        Quantity: 2,
        Total_Price: 17.98,
      },
      {
        Item_Name: "French Fries",
        Item_Price: 3.99,
        Quantity: 1,
        Total_Price: 3.99,
      },
      {
        Item_Name: "Milkshake",
        Item_Price: 4.99,
        Quantity: 1,
        Total_Price: 4.99,
      },
    ],
    Order_Type: "Dine In",
    Order_Status: "In Transit",
    Delivery_Person: "David Lee",
    Delivery_Status: "In Transit",
    Timestamp: "2023-03-02T12:15:00Z",
  },
  {
    Order_ID: 1003,
    Customer_Name: "Emily Brown",
    Customer_Phone: "555-9101",
    Customer_Address: "789 Pine St",
    Items: [
      {
        Item_Name: "California Roll",
        Item_Price: 12.99,
        Quantity: 3,
        Total_Price: 38.97,
      },
      {
        Item_Name: "Edamame",
        Item_Price: 4.99,
        Quantity: 1,
        Total_Price: 4.99,
      },
      {
        Item_Name: "Green Tea",
        Item_Price: 1.99,
        Quantity: 2,
        Total_Price: 3.98,
      },
    ],
    Order_Type: "Online",
    Order_Status: "Pending",
    Delivery_Person: "",
    Delivery_Status: "",
    Timestamp: "2023-03-03T15:45:00Z",
  },
  {
    Order_ID: 1004,
    Customer_Name: "Michael Davis",
    Customer_Phone: "555-2468",
    Customer_Address: "246 Oak St",
    Items: [
      {
        Item_Name: "Margherita Pizza",
        Item_Price: 11.99,
        Quantity: 1,
        Total_Price: 11.99,
      },
      {
        Item_Name: "Caesar Salad",
        Item_Price: 7.99,
        Quantity: 1,
        Total_Price: 7.99,
      },
      {
        Item_Name: "Iced Tea",
        Item_Price: 2.49,
        Quantity: 2,
        Total_Price: 4.98,
      },
    ],
    Order_Type: "Dine In",
    Order_Status: "Delivered",
    Delivery_Person: "Emily Parker",
    Delivery_Status: "Delivered",
    Timestamp: "2023-03-04T18:30:00Z",
  },
  {
    Order_ID: 1005,
    Customer_Name: "Sophia Wilson",
    Customer_Phone: "555-1357",
    Customer_Address: "357 Maple St",
    Items: [
      {
        Item_Name: "Chicken Tikka Masala",
        Item_Price: 13.99,
        Quantity: 2,
        Total_Price: 27.98,
      },
      {
        Item_Name: "Naan Bread",
        Item_Price: 3.49,
        Quantity: 3,
        Total_Price: 10.47,
      },
      {
        Item_Name: "Rice Pilaf",
        Item_Price: 4.99,
        Quantity: 2,
        Total_Price: 9.98,
      },
    ],
    Order_Type: "Online",
    Order_Status: "In Transit",
    Delivery_Person: "James Smith",
    Delivery_Status: "In Transit",
    Timestamp: "2023-03-05T09:15:00Z",
  },
  {
    Order_ID: 1006,
    Customer_Name: "Emma Thompson",
    Customer_Phone: "555-3698",
    Customer_Address: "369 Pine St",
    Items: [
      {
        Item_Name: "Spaghetti Carbonara",
        Item_Price: 12.99,
        Quantity: 1,
        Total_Price: 12.99,
      },
      {
        Item_Name: "Garlic Bread",
        Item_Price: 5.99,
        Quantity: 2,
        Total_Price: 11.98,
      },
      {
        Item_Name: "Tiramisu",
        Item_Price: 6.99,
        Quantity: 1,
        Total_Price: 6.99,
      },
    ],
    Order_Type: "Dine In",
    Order_Status: "Delivered",
    Delivery_Person: "Sarah Johnson",
    Delivery_Status: "Delivered",
    Timestamp: "2023-03-06T13:45:00Z",
  },
  {
    Order_ID: 1007,
    Customer_Name: "Oliver Brown",
    Customer_Phone: "555-2468",
    Customer_Address: "468 Oak St",
    Items: [
      {
        Item_Name: "Double Cheeseburger",
        Item_Price: 9.99,
        Quantity: 2,
        Total_Price: 19.98,
      },
      {
        Item_Name: "Onion Rings",
        Item_Price: 4.49,
        Quantity: 1,
        Total_Price: 4.49,
      },
      {
        Item_Name: "Soda",
        Item_Price: 1.99,
        Quantity: 3,
        Total_Price: 5.97,
      },
    ],
    Order_Type: "Online",
    Order_Status: "Delivered",
    Delivery_Person: "David Lee",
    Delivery_Status: "Delivered",
    Timestamp: "2023-03-07T16:30:00Z",
  },
  {
    Order_ID: 1008,
    Customer_Name: "Isabella Garcia",
    Customer_Phone: "555-7890",
    Customer_Address: "789 Elm St",
    Items: [
      {
        Item_Name: "Fish and Chips",
        Item_Price: 14.99,
        Quantity: 1,
        Total_Price: 14.99,
      },
      {
        Item_Name: "Cole Slaw",
        Item_Price: 2.99,
        Quantity: 1,
        Total_Price: 2.99,
      },
      {
        Item_Name: "Lemonade",
        Item_Price: 2.49,
        Quantity: 2,
        Total_Price: 4.98,
      },
    ],
    Order_Type: "Dine In",
    Order_Status: "In Transit",
    Delivery_Person: "Emily Parker",
    Delivery_Status: "In Transit",
    Timestamp: "2023-03-08T11:15:00Z",
  },
  {
    Order_ID: 1009,
    Customer_Name: "Liam Wilson",
    Customer_Phone: "555-3698",
    Customer_Address: "698 Pine St",
    Items: [
      {
        Item_Name: "Pad Thai Noodles",
        Item_Price: 11.99,
        Quantity: 2,
        Total_Price: 23.98,
      },
      {
        Item_Name: "Spring Rolls",
        Item_Price: 5.49,
        Quantity: 3,
        Total_Price: 16.47,
      },
      {
        Item_Name: "Thai Iced Tea",
        Item_Price: 3.99,
        Quantity: 2,
        Total_Price: 7.98,
      },
    ],
    Order_Type: "Online",
    Order_Status: "Pending",
    Delivery_Person: "",
    Delivery_Status: "",
    Timestamp: "2023-03-09T14:45:00Z",
  },
  {
    Order_ID: 1010,
    Customer_Name: "Charlotte Lee",
    Customer_Phone: "555-1357",
    Customer_Address: "357 Cedar St",
    Items: [
      {
        Item_Name: "Margherita Pizza",
        Item_Price: 11.99,
        Quantity: 1,
        Total_Price: 11.99,
      },
      {
        Item_Name: "Caprese Salad",
        Item_Price: 6.99,
        Quantity: 1,
        Total_Price: 6.99,
      },
      {
        Item_Name: "Italian Soda",
        Item_Price: 3.49,
        Quantity: 2,
        Total_Price: 6.98,
      },
    ],
    Order_Type: "Dine In",
    Order_Status: "Delivered",
    Delivery_Person: "James Smith",
    Delivery_Status: "Delivered",
    Timestamp: "2023-03-10T19:30:00Z",
  },
]

export async function fetchOrdersData(dateRange: { from: Date; to: Date }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Filter by date range if provided
  if (dateRange.from || dateRange.to) {
    return SAMPLE_DATA.filter((order) => {
      const orderDate = new Date(order.Timestamp)

      if (dateRange.from && dateRange.to) {
        return orderDate >= dateRange.from && orderDate <= dateRange.to
      } else if (dateRange.from) {
        return orderDate >= dateRange.from
      } else if (dateRange.to) {
        return orderDate <= dateRange.to
      }

      return true
    })
  }

  return SAMPLE_DATA
}