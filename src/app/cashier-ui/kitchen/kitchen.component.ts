import { Component } from '@angular/core';
import { MenuListService } from '../menu-list.service';
import { map } from 'rxjs';
import { OrderList } from '../menu-list.model';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.scss'
})
export class KitchenComponent {

  orderList = [
    {
        "cottage": [
            {
                "id": "2",
                "name": "Cottage 2",
                "price": 200
            }
        ],
        "orderType": "Dine In",
        "subtotal": 1330,
        "cottageFee": 200,
        "grandTotal": 1530,
        "paidAmount": 0,
        "status": "Preparing",
        "details": [
            {
                "id": "11",
                "name": "Pineapple",
                "quantity": 2,
                "price": 40,
                "size": "",
                "total": 80
            },
            {
                "id": "12",
                "name": "Drinks 12",
                "quantity": 1,
                "price": 40,
                "size": "",
                "total": 40
            },
            {
                "id": "10",
                "name": "Mango",
                "quantity": 1,
                "price": 40,
                "size": "",
                "total": 40
            },
            {
                "id": "9",
                "name": "Four Seasons",
                "quantity": 1,
                "price": 40,
                "size": "",
                "total": 40
            },
            {
                "id": "1",
                "name": "Pizza Staff",
                "quantity": 1,
                "price": 450,
                "size": "16in",
                "total": 450
            },
            {
                "id": "1",
                "name": "Pizza Staff",
                "quantity": 2,
                "price": 340,
                "size": "12in",
                "total": 680
            }
        ],
        "cottageParsed": "Cottage 2"
    },
    {
        "cottage": [
            {
                "id": "1",
                "name": "Cottage 1",
                "price": 150
            }
        ],
        "orderType": "Dine In",
        "subtotal": 790,
        "cottageFee": 150,
        "grandTotal": 940,
        "paidAmount": 0,
        "status": "Preparing",
        "details": [
            {
                "id": "1",
                "name": "Pizza Staff",
                "quantity": 1,
                "price": 450,
                "size": "16in",
                "total": 450
            },
            {
                "id": "1",
                "name": "Pizza Staff",
                "quantity": 1,
                "price": 340,
                "size": "12in",
                "total": 340
            }
        ],
        "cottageParsed": "Cottage 1"
    },{
      "cottage": [
          {
              "id": "2",
              "name": "Cottage 2",
              "price": 200
          }
      ],
      "orderType": "Dine In",
      "subtotal": 1330,
      "cottageFee": 200,
      "grandTotal": 1530,
      "paidAmount": 0,
      "status": "Preparing",
      "details": [
          {
              "id": "11",
              "name": "Pineapple",
              "quantity": 2,
              "price": 40,
              "size": "",
              "total": 80
          },
          {
              "id": "12",
              "name": "Drinks 12",
              "quantity": 1,
              "price": 40,
              "size": "",
              "total": 40
          },
          {
              "id": "10",
              "name": "Mango",
              "quantity": 1,
              "price": 40,
              "size": "",
              "total": 40
          },
          {
              "id": "9",
              "name": "Four Seasons",
              "quantity": 1,
              "price": 40,
              "size": "",
              "total": 40
          },
          {
              "id": "1",
              "name": "Pizza Staff",
              "quantity": 1,
              "price": 450,
              "size": "16in",
              "total": 450
          },
          {
              "id": "1",
              "name": "Pizza Staff",
              "quantity": 2,
              "price": 340,
              "size": "12in",
              "total": 680
          }
      ],
      "cottageParsed": "Cottage 2"
  },
  {
      "cottage": [
          {
              "id": "1",
              "name": "Cottage 1",
              "price": 150
          }
      ],
      "orderType": "Dine In",
      "subtotal": 790,
      "cottageFee": 150,
      "grandTotal": 940,
      "paidAmount": 0,
      "status": "Preparing",
      "details": [
          {
              "id": "1",
              "name": "Pizza Staff",
              "quantity": 1,
              "price": 450,
              "size": "16in",
              "total": 450
          },
          {
              "id": "1",
              "name": "Pizza Staff",
              "quantity": 1,
              "price": 340,
              "size": "12in",
              "total": 340
          }
      ],
      "cottageParsed": "Cottage 1"
  },{
    "cottage": [
        {
            "id": "2",
            "name": "Cottage 2",
            "price": 200
        }
    ],
    "orderType": "Dine In",
    "subtotal": 1330,
    "cottageFee": 200,
    "grandTotal": 1530,
    "paidAmount": 0,
    "status": "Preparing",
    "details": [
        {
            "id": "11",
            "name": "Pineapple",
            "quantity": 2,
            "price": 40,
            "size": "",
            "total": 80
        },
        {
            "id": "12",
            "name": "Drinks 12",
            "quantity": 1,
            "price": 40,
            "size": "",
            "total": 40
        },
        {
            "id": "10",
            "name": "Mango",
            "quantity": 1,
            "price": 40,
            "size": "",
            "total": 40
        },
        {
            "id": "9",
            "name": "Four Seasons",
            "quantity": 1,
            "price": 40,
            "size": "",
            "total": 40
        },
        {
            "id": "1",
            "name": "Pizza Staff",
            "quantity": 1,
            "price": 450,
            "size": "16in",
            "total": 450
        },
        {
            "id": "1",
            "name": "Pizza Staff",
            "quantity": 2,
            "price": 340,
            "size": "12in",
            "total": 680
        }
    ],
    "cottageParsed": "Cottage 2"
},
{
    "cottage": [
        {
            "id": "1",
            "name": "Cottage 1",
            "price": 150
        }
    ],
    "orderType": "Dine In",
    "subtotal": 790,
    "cottageFee": 150,
    "grandTotal": 940,
    "paidAmount": 0,
    "status": "Preparing",
    "details": [
        {
            "id": "1",
            "name": "Pizza Staff",
            "quantity": 1,
            "price": 450,
            "size": "16in",
            "total": 450
        },
        {
            "id": "1",
            "name": "Pizza Staff",
            "quantity": 1,
            "price": 340,
            "size": "12in",
            "total": 340
        }
    ],
    "cottageParsed": "Cottage 1"
},{
  "cottage": [
      {
          "id": "2",
          "name": "Cottage 2",
          "price": 200
      }
  ],
  "orderType": "Dine In",
  "subtotal": 1330,
  "cottageFee": 200,
  "grandTotal": 1530,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "11",
          "name": "Pineapple",
          "quantity": 2,
          "price": 40,
          "size": "",
          "total": 80
      },
      {
          "id": "12",
          "name": "Drinks 12",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "10",
          "name": "Mango",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "9",
          "name": "Four Seasons",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 2,
          "price": 340,
          "size": "12in",
          "total": 680
      }
  ],
  "cottageParsed": "Cottage 2"
},
{
  "cottage": [
      {
          "id": "1",
          "name": "Cottage 1",
          "price": 150
      }
  ],
  "orderType": "Dine In",
  "subtotal": 790,
  "cottageFee": 150,
  "grandTotal": 940,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 340,
          "size": "12in",
          "total": 340
      }
  ],
  "cottageParsed": "Cottage 1"
},{
  "cottage": [
      {
          "id": "2",
          "name": "Cottage 2",
          "price": 200
      }
  ],
  "orderType": "Dine In",
  "subtotal": 1330,
  "cottageFee": 200,
  "grandTotal": 1530,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "11",
          "name": "Pineapple",
          "quantity": 2,
          "price": 40,
          "size": "",
          "total": 80
      },
      {
          "id": "12",
          "name": "Drinks 12",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "10",
          "name": "Mango",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "9",
          "name": "Four Seasons",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 2,
          "price": 340,
          "size": "12in",
          "total": 680
      }
  ],
  "cottageParsed": "Cottage 2"
},
{
  "cottage": [
      {
          "id": "1",
          "name": "Cottage 1",
          "price": 150
      }
  ],
  "orderType": "Dine In",
  "subtotal": 790,
  "cottageFee": 150,
  "grandTotal": 940,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 340,
          "size": "12in",
          "total": 340
      }
  ],
  "cottageParsed": "Cottage 1"
},{
  "cottage": [
      {
          "id": "2",
          "name": "Cottage 2",
          "price": 200
      }
  ],
  "orderType": "Dine In",
  "subtotal": 1330,
  "cottageFee": 200,
  "grandTotal": 1530,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "11",
          "name": "Pineapple",
          "quantity": 2,
          "price": 40,
          "size": "",
          "total": 80
      },
      {
          "id": "12",
          "name": "Drinks 12",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "10",
          "name": "Mango",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "9",
          "name": "Four Seasons",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 2,
          "price": 340,
          "size": "12in",
          "total": 680
      }
  ],
  "cottageParsed": "Cottage 2"
},
{
  "cottage": [
      {
          "id": "1",
          "name": "Cottage 1",
          "price": 150
      }
  ],
  "orderType": "Dine In",
  "subtotal": 790,
  "cottageFee": 150,
  "grandTotal": 940,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 340,
          "size": "12in",
          "total": 340
      }
  ],
  "cottageParsed": "Cottage 1"
},{
  "cottage": [
      {
          "id": "2",
          "name": "Cottage 2",
          "price": 200
      }
  ],
  "orderType": "Dine In",
  "subtotal": 1330,
  "cottageFee": 200,
  "grandTotal": 1530,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "11",
          "name": "Pineapple",
          "quantity": 2,
          "price": 40,
          "size": "",
          "total": 80
      },
      {
          "id": "12",
          "name": "Drinks 12",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "10",
          "name": "Mango",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "9",
          "name": "Four Seasons",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 2,
          "price": 340,
          "size": "12in",
          "total": 680
      }
  ],
  "cottageParsed": "Cottage 2"
},
{
  "cottage": [
      {
          "id": "1",
          "name": "Cottage 1",
          "price": 150
      }
  ],
  "orderType": "Dine In",
  "subtotal": 790,
  "cottageFee": 150,
  "grandTotal": 940,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 340,
          "size": "12in",
          "total": 340
      }
  ],
  "cottageParsed": "Cottage 1"
},{
  "cottage": [
      {
          "id": "2",
          "name": "Cottage 2",
          "price": 200
      }
  ],
  "orderType": "Dine In",
  "subtotal": 1330,
  "cottageFee": 200,
  "grandTotal": 1530,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "11",
          "name": "Pineapple",
          "quantity": 2,
          "price": 40,
          "size": "",
          "total": 80
      },
      {
          "id": "12",
          "name": "Drinks 12",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "10",
          "name": "Mango",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "9",
          "name": "Four Seasons",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 2,
          "price": 340,
          "size": "12in",
          "total": 680
      }
  ],
  "cottageParsed": "Cottage 2"
},
{
  "cottage": [
      {
          "id": "1",
          "name": "Cottage 1",
          "price": 150
      }
  ],
  "orderType": "Dine In",
  "subtotal": 790,
  "cottageFee": 150,
  "grandTotal": 940,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 340,
          "size": "12in",
          "total": 340
      }
  ],
  "cottageParsed": "Cottage 1"
},{
  "cottage": [
      {
          "id": "2",
          "name": "Cottage 2",
          "price": 200
      }
  ],
  "orderType": "Dine In",
  "subtotal": 1330,
  "cottageFee": 200,
  "grandTotal": 1530,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "11",
          "name": "Pineapple",
          "quantity": 2,
          "price": 40,
          "size": "",
          "total": 80
      },
      {
          "id": "12",
          "name": "Drinks 12",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "10",
          "name": "Mango",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "9",
          "name": "Four Seasons",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 2,
          "price": 340,
          "size": "12in",
          "total": 680
      }
  ],
  "cottageParsed": "Cottage 2"
},
{
  "cottage": [
      {
          "id": "1",
          "name": "Cottage 1",
          "price": 150
      }
  ],
  "orderType": "Dine In",
  "subtotal": 790,
  "cottageFee": 150,
  "grandTotal": 940,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 340,
          "size": "12in",
          "total": 340
      }
  ],
  "cottageParsed": "Cottage 1"
},{
  "cottage": [
      {
          "id": "2",
          "name": "Cottage 2",
          "price": 200
      }
  ],
  "orderType": "Dine In",
  "subtotal": 1330,
  "cottageFee": 200,
  "grandTotal": 1530,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "11",
          "name": "Pineapple",
          "quantity": 2,
          "price": 40,
          "size": "",
          "total": 80
      },
      {
          "id": "12",
          "name": "Drinks 12",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "10",
          "name": "Mango",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "9",
          "name": "Four Seasons",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 2,
          "price": 340,
          "size": "12in",
          "total": 680
      }
  ],
  "cottageParsed": "Cottage 2"
},
{
  "cottage": [
      {
          "id": "1",
          "name": "Cottage 1",
          "price": 150
      }
  ],
  "orderType": "Dine In",
  "subtotal": 790,
  "cottageFee": 150,
  "grandTotal": 940,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 340,
          "size": "12in",
          "total": 340
      }
  ],
  "cottageParsed": "Cottage 1"
},{
  "cottage": [
      {
          "id": "2",
          "name": "Cottage 2",
          "price": 200
      }
  ],
  "orderType": "Dine In",
  "subtotal": 1330,
  "cottageFee": 200,
  "grandTotal": 1530,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "11",
          "name": "Pineapple",
          "quantity": 2,
          "price": 40,
          "size": "",
          "total": 80
      },
      {
          "id": "12",
          "name": "Drinks 12",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "10",
          "name": "Mango",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "9",
          "name": "Four Seasons",
          "quantity": 1,
          "price": 40,
          "size": "",
          "total": 40
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 2,
          "price": 340,
          "size": "12in",
          "total": 680
      }
  ],
  "cottageParsed": "Cottage 2"
},
{
  "cottage": [
      {
          "id": "1",
          "name": "Cottage 1",
          "price": 150
      }
  ],
  "orderType": "Dine In",
  "subtotal": 790,
  "cottageFee": 150,
  "grandTotal": 940,
  "paidAmount": 0,
  "status": "Preparing",
  "details": [
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 450,
          "size": "16in",
          "total": 450
      },
      {
          "id": "1",
          "name": "Pizza Staff",
          "quantity": 1,
          "price": 340,
          "size": "12in",
          "total": 340
      }
  ],
  "cottageParsed": "Cottage 1"
}
]
  orderList$:any = this.menuService.orderList$.pipe(
    map((orderList:OrderList[])=>{
      const filteredOrderList = orderList.filter((order)=>order.status ==='Preparing')
      //return this.orderList;
      const parsedOrderList = filteredOrderList.map((order:OrderList)=>{
        const cottageParsed = order.cottage.map((cot:any)=>cot.name).join(', ');
        return {...order, cottageParsed}
      })
      
      console.log('orders', parsedOrderList)
      return parsedOrderList;
    })
  );
  constructor(private readonly menuService: MenuListService){}

  serve(order:OrderList){
    order.status = 'Served';
    this.menuService.updateOrderList(order);
  }
}

