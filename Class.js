class Customer {
    orders = []; // Initialize orders array

    constructor(name, address) {
        this.name = name;
        this.adress = address;
    }

    addOrder(order) {
        this.orders.push(order);
    }
}

class Order {
    orderDetails = [];
    Payment = null;
    constructor(date, status){
        this.date = date
        this.status = status; 
    }
    calcSubTotal() {
        let subTotal = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            subTotal += this.orderDetails[i].calcSubTotal();
        }
        return subTotal;
    }
    calcTax() {
        let tax = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            tax += this.orderDetails[i].calcTax();
        }
        return tax;
    }
    calcTotal() {
        return this.calcSubTotal() + this.calcTax();
    }
    calcTotalWeight() {
        let weight = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            weight += this.orderDetails[i].calcTotalWeight();
        }
        return weight;
    }
    addPayment(Payment){
        this.Payment = Payment;
    }
    addOrderDetail(orderDetail) {
        this.orderDetails.push(orderDetail);
    }

printDetail() {
    let total = 0;
    for (let i = 0; i < this.orderDetails.length; i++) {
        console.log(
            "ลำดับที่ " + (i + 1) + " " + this.orderDetails[i].getDetail()
        );
    }
    console.log("รวมทั้งหมด " + this.calcSubTotal() + " บาท");
    this.Payment.printDetail();
    }
}

class OrderDetail {
    constructor(quanity, taxStatus){
        this.quanity = quanity
        this.taxStatus = taxStatus;
    }
    calcSubTotal() {
        return this.item.getPriceForQuantity(this.quantity) + this.calcTax();
    }
    calcWeight() {
        return this.item.shippingWeight;
    }
    calcTax() {
        return this.item.getTax(this.taxStatus);
    }
    addItem(item) {
        this.item = item
    }
    getDetail() {
        return (
            this.item.description + 
            " จำนวน " + 
            this.quanity + 
            " รายการ " +
            " ราคา " +
            this.calcSubTotal() +
            " บาท "
        );
    }
}

class Item {
    constructor(shippingWeight, description, price){
        this.shippingWeight = shippingWeight
        this.description = description
        this.price = price;
    }
    setInStock(status) {
        this.inStock = status;
    }
    getPriceForQuantity(quantity) {
        return this.price * quantity;
    }
    getTax(taxStatus) {
        if (taxStatus === "Tax included"){
            return 0;
        } else {
            return 0.07 * this.price;
        }
    }
    inStock() {
        return this.inStock;
    }
}

class Payment {
    constructor(amount) {
        this.amount = amount;
    }
    printDetail() {
        console.log("ชำระเงินด้วย...");
    }
}

class Cash extends Payment{
    constructor(amount, cashTendered) {
        super(amount);
        this.cashTendered = cashTendered;
    }
    printDetail() {
        console.log("ชำระด้วยเงินสด จำนวน " + this.amount + " บาท");
    }
}

class Check extends Payment{
  constructor(amount, name, bankID) {
    super(amount);
    this.name = name;
    this.bankID = bankID;
  }
  authorized() {
    console.log("321");
  }
  printDetail() {
    console.log("ชำระด้วยเช็ค จำนวน " + this.amount + " บาท");
  }
}

class Credit extends Payment{
  constructor(amount, number, type, expDate) {
    super(amount);
    this.name = number;
    this.type = type;
    this.expDate = expDate;
  }
  authorized() {
    console.log("123");
  }
  printDetail() {
    console.log("ชำระด้วยบัตรเครดิต จำนวน " + this.amount + " บาท");
  }
}

const main = () => {
    let customer1 = new Customer("Tanny","Nakhon Pathom");
    // console.log(customer1);
    //Product Items
    const item1 = new Item(0.3,"อAll in one Bucket", 299);
    const item2 = new Item(0.1, "Chicken Pop", 39);
    const item3 = new Item(0.2, "The Box Ultra", 159);
    const item4 = new Item(0.2, "Chick And Share Team Nugget Pop", 99);
    const item5 = new Item(0.4, "Combo ข้าวไก่กรอบแกงเขียวหวาน", 89);
    

    //Create Order
    const order1 = new Order("08/01/2567", "In process");
    const order2 = new Order("07/01/2576", "In process");

   
    //create order detail
    const orderDetail1 = new OrderDetail(2, "tax included");
    orderDetail1.addItem(item1);
    const orderDetail2 = new OrderDetail (5, "tax included");
    orderDetail2.addItem(item2);
    const orderDetail3 = new OrderDetail (5, "tax included");
    orderDetail3.addItem(item3);
    const orderDetail4 = new OrderDetail (5, "tax included");
    orderDetail4.addItem(item4);
    const orderDetail5 = new OrderDetail (5, "tax included");
    orderDetail5.addItem(item5);
    
 //add order to a customer
 order1.addOrderDetail(orderDetail1);
 order2.addOrderDetail(orderDetail2);

    // console.log(orderDetail1)

    // console.log("ชื่อ : " + customer1.name);
    // console.log("จำนวนคำสั่งซื้อ : " + customer1.orders.length); 
    // for (i = 0; i < customer1.orders.length; i++) {
    //     console.log("คำสั่งซื้อที่ : " + (i + 1));
    //     for (j = 0; j < customer1.orders[i].orderDetails.length; j++) {
    //         const item = customer1.orders[i].orderDetails[j].item;
    //         const quanity = customer1.orders[i].orderDetails[j].quanity;
    //         const subTotal = quantity * item.price;
    //         total += subTotal;
    //         console.log(
    //             "ลำดับที่ : " +
    //              (j + 1) +
    //               " " +
    //                item.description +
    //                 " จำนวน ราคา " + 
    //                 quanity +
    //                  " รายการ ราคา " +
    //                   quanity +
    //                    item.price +
    //                     "บาท"
    //         );
    //     }
    //     console.log("รวมทั้งหมด" + total + " บาท ");
    // }

    //add order detail to an order
    order2.addOrderDetail(orderDetail3);
    order2.addOrderDetail(orderDetail4);
    order2.addOrderDetail(orderDetail5);

    //Payment 
    const cash = new Cash(order1.calcTotal(), "");
    customer1.orders[0].addPayment(cash);

    const credit = new Credit(
        order2.calcTotal(),
        "1234567891231212",
        "credit",
        "10/24"
    );
    customer1.orders[1].addPayment(credit);

    //display
    console.log("ชื่อ : " + customer1.name);
    console.log("จำนวนสั่งซื้อ :" + (i + 1));
    for (let i = 0; i < customer1.orders.length; i++) {
        console.log("คำสั่งซื้อที่ :" + (i + 1));
        customer1.orders[i].printDetail();
    }
};

main();
