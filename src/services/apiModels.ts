export type Response<T> = {
  success: boolean,
  status: string,
  data: T ,
};

export type IPaystackInitializePayment = {
  /**
   * "status": true,
  "message": "Authorization URL created",
  "data": {
    "authorization_url": "https://checkout.paystack.com/0peioxfhpn",
    "access_code": "0peioxfhpn",
    "reference": "7PVGX8MEk85tgeEpVDtD"
  }
   */
  // status: boolean,
  // message: string,
  // data: {
    authorization_url: string,
    access_code: string,
    reference: string,
  // };
};

export type IPaystackVerifyPayment = {

  /**
   * funded {
  success: true,
  status: 'Verification successful',
  data: {
    id: 3242174387,
    domain: 'test',
    status: 'abandoned',
    reference: '7i7ebsk09e',
    receipt_number: null,
    amount: 20000,
    message: null,
    gateway_response: 'The transaction was not completed',
    paid_at: null,
    created_at: '2023-10-31T15:56:57.000Z',
    channel: 'card',
    currency: 'NGN',
    ip_address: '102.215.57.7, 172.69.12.158, 172.31.63.81',
    metadata: '',
    log: null,
    fees: null,
    fees_split: null,
    authorization: {},
    customer: {
      id: 146425953,
      first_name: null,
      last_name: null,
      email: 'adetoyebamise@gmail.com',
      customer_code: 'CUS_fleepn1xsu9r66c',
      phone: null,
      metadata: null,
      risk_action: 'default',
      international_format_phone: null
    },
    plan: null,
    split: {},
    order_id: null,
    paidAt: null,
    createdAt: '2023-10-31T15:56:57.000Z',
    requested_amount: 20000,
    pos_transaction_data: null,
    source: null,
    fees_breakdown: null,
    transaction_date: '2023-10-31T15:56:57.000Z',
    plan_object: {},
    subaccount: {}
  }
  }
 */


  success: boolean,
  status: string,
  data: {
    id: number,
    domain: string,
    status: string,
      reference: string,
      receipt_number: any,
      amount: number;
      mesage: any,
      gateway_response: string,
      paid_at: any,
      created_at: string,
      channel: string,
      currency: string,
      ip_address: string,
      metadata: string,
      log: any,
      fees: any,
      fees_split: any,
      authorization: object,
      customer : object,
      plan: any,
      split: object,
      order_id: any,
      paidAt: any,
      requested_amount: string,
      pos_transaction_data: any,
      source: any,
      fees_breakdown: any,
      transaction_date: string,
      plan_object: object,
      subaccount: object,
      createdAt: string,
    };
};