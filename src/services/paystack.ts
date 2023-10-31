import axios, { AxiosInstance, AxiosRequestConfig } from "axios"; 
import { Response, IPaystackInitializePayment, IPaystackVerifyPayment } from "./apiModels";
import _ from "lodash";  
import { HttpException } from "@nestjs/common";

export class Paystack {
  private readonly secretKey: string;
  private readonly baseUrl: string;
  private paystackClient: AxiosInstance;

  constructor(config: ["paystack"]) {
    this.secretKey = "sk_test_9d8facad92894d3b0777d809f0e324dcd89ca06e"; 
    this.baseUrl = "https://api.paystack.co";

    this.paystackClient = axios.create({
      baseURL: this.baseUrl,
      responseType: "json",
      timeout: 180000,
      maxRedirects: 5,
      validateStatus: function (status: number) {
        return status >= 200 && status < 300;
      },
    });

    //Set Header
    this.paystackClient.interceptors.request.use((req: any) => {
      req.headers = {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${this.secretKey}`,
      };

      return req;
    });
  }

  /* 
    Send SMS
    */
  public async initializePayment(params: {
    email: string;
    amount: string;
  }): Promise<Response<IPaystackInitializePayment>> {
    try {
      console.log( "info", `Hit Paystack initializePayment method - Params - ${JSON.stringify(params)}`);

      const data = {
        email: params.email,
        amount: params.amount,
      };

      const response = await this.paystackClient.post(`/transaction/initialize`, data);

      console.log( "info", `Hit Paystack initialize Payment - Success data: ${JSON.stringify( response.data  )}`);

      return {
        success: true,
        status: response.data.message ? response.data.message : "success",
        data: response.data.data,
      };
    } catch (error: any) {
      console.log(  "error",  `Error Occured in Paystack initializePayment method ${JSON.stringify(error.message)}` );
      throw new HttpException("Some thing went wrong", 400);

    }
  }

  public async verifyPayment(params: {
    reference: string; 
  }): Promise<Response<IPaystackVerifyPayment>> {
    try {
      console.log( "info",  `Hit Paystack verifyPayment method - Params - ${JSON.stringify(  params  )}` );

      const response = await this.paystackClient.get( `/transaction/verify/${params.reference}` );

      console.log("info", `Hit get Bank Details method - Success data: ${JSON.stringify( response.data )}` );
        
      return {
        success: true,
        status: response.data.message ? response.data.message : "success",
        data: response.data.data,
      };
    } catch (error: any) {
      console.log( "error",  `Error Occured in Paystack get Bank Details method ${JSON.stringify(  error.message )}` );
      throw new HttpException("Some thing went wrong", 400);
    }
  }
}
