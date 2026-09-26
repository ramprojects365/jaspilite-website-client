import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

import { DialogModule } from "primeng/dialog";
import { Title } from "@angular/platform-browser";

import { NadminSalesService } from "../nadminsales.service";

@Component({
  selector: "app-nadmin-salesdetails",
  templateUrl: "./nadmin-salesdetails.component.html",
  styleUrls: ["./nadmin-salesdetails.component.scss"],
})
export class NadminSalesdetailsComponent implements OnInit {
  sale: any;
  total: any;
  grandTotal: any;
  customerNote: string;
  address: any;
  addressString: string;
  saleDetails = [];
  totalItems = 0;
  cols = [];
  isPrinting = false;
  displayAddSale = false;
  shopItems = [];
  clonedProduct: any;
  selectedProduct: string;
  selectedImage: string;
  selectedItemId: string;
  selectedPrice: number;
  selectedDiscount: number;
  displayModal: boolean;
  itemToBeDeleted: any;

  constructor(
    private nadminSalesService: NadminSalesService,
    private location: Location,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public router: Router,
    private title: Title,
  ) {}

  ngOnInit() {
    this.title.setTitle(
      "Mini Mart - Free delivery Mobile app for food and groceries",
    );
    this.cols = [
      { field: "name", header: "Name" },
      { field: "item_price", header: "Unit Price" },
      { field: "quantity", header: "Quantity" },
      { field: "discount", header: "Discount" },
      { field: "total", header: "Total" },
    ];
    this.sale = [];
    // this.address = [];
    // console.log(this.nadminSalesService.sale);
    if (this.nadminSalesService.sale === undefined) {
      this.location.back();
    } else {
      this.sale = this.nadminSalesService.sale;
      this.getSalesDetails();
      this.getAddress(this.sale.address_id);
      this.customerNote = this.sale.remarks;
      this.grandTotal =
        parseFloat(this.sale.total) +
        parseFloat(this.sale.delivery_charge) -
        parseFloat(this.sale.discount) -
        (this.sale.voucher_discount
          ? parseFloat(this.sale.voucher_discount)
          : 0);
    }
  }

  getAddress(addressId) {
    this.nadminSalesService.getAddress(addressId).subscribe((details) => {
      this.address = details.payload.address[0];
      this.addressString =
        this.address.unit_number +
        ", " +
        this.address.condo_name +
        ", " +
        this.address.address +
        ", " +
        this.address.pin_code;
      // console.log(this.addressString);
    });
  }

  getSalesDetails() {
    this.nadminSalesService
      .getSaleDetails(this.sale.sales_id)
      .subscribe((details) => {
        this.saleDetails = details.payload.saledetails;
        //console.log('sale details ' +JSON.stringify(this.saleDetails));
        this.totalItems = this.saleDetails.reduce((sum, item) => {
          return sum + item.quantity;
        }, 0);
        this.recalculateGrandTotal();
        //console.log(this.saleDetails);
      });
  }
  printPDFSale() {
    const data = document.getElementById("contentToConvert");
    const pdf = new jsPDF();
    // const col = ['Name', 'EAN / Article', 'Unit Price', 'Quantity', 'Discount', 'Total'];
    const col = ["Name", "SKU / Article", "Price", "Quantity", "Total"];
    const rows = [];
    this.saleDetails.forEach((element) => {
      const total = (
        element.item_price * element.quantity -
        element.discount
      ).toFixed(2);
      //const row = [element.name, "EAN: " + (element.item_qr_code != 0 ? element.item_qr_code : "") + "\nART: " + (element.articleNumber ? element.articleNumber : ""), element.item_price, element.quantity, element.discount, total];
      const row = [
        element.name,
        "SKU: " +
          (element.item_qr_code != 0 ? element.item_qr_code : "") +
          "\nART: " +
          (element.articleNumber ? element.articleNumber : ""),
        element.item_price,
        element.quantity,
        total,
      ];
      rows.push(row);
    });
    if (this.sale.discount > 0) {
      rows.push(["", "", "", "Discount", this.sale.discount]);
    }
    if (this.sale.voucher_discount > 0) {
      rows.push(["", "", "", "Voucher Discount", this.sale.voucher_discount]);
    }
    if (this.sale.delivery_charge > 0) {
      rows.push(["", "", "", "Delivery Fee", this.sale.delivery_charge]);
    }
    rows.push(["", "", "", "Grand Total", this.grandTotal]);

    pdf.text("Minimart", 15, 12);
    pdf.setFontSize(11);
    const header = [];
    header.push("Name : " + this.sale.displayName);
    header.push("Phone : " + this.sale.phoneNumber);
    header.push("Date : " + this.sale.date);
    header.push("Sales Id : " + this.sale.salesIdString);
    header.push("Address : ");
    const addressParts = pdf.splitTextToSize(this.addressString, 180);
    addressParts.forEach((item) => {
      header.push(item);
    });
    pdf.text("Customer Note : " + this.customerNote, 15, 50);

    pdf.text(header, 15, 20);
    (pdf as any).autoTable(col, rows, {
      startY: 55,
    });
    pdf.save(this.sale.salesIdString + ".pdf"); // Generated PDF
  }

  showAddSale() {
    this.getShopItems(this.sale.branch_id);
    this.displayAddSale = true;
  }
  onRightClick(event) {
    return false;
  }
  cancelAddSale(form: NgForm) {
    form.reset();
    this.displayAddSale = false;
  }

  getShopItems(branchId) {
    this.nadminSalesService.getAllShopItems(branchId).subscribe((products) => {
      // console.log(products);
      this.shopItems = products.payload.products.map((item) => {
        return {
          label: item.name,
          value: item.product_id,
          image: item.image,
          price: item.item_price,
          discount: item.item_discount,
          item_id: item.item_id,
        };
      });
      this.selectedProduct = this.shopItems[0].value;
      this.selectedImage = this.shopItems[0].image;
      this.selectedPrice = this.shopItems[0].price;
      this.selectedDiscount = this.shopItems[0].discount;
      this.selectedItemId = this.shopItems[0].item_id;
    });
  }

  changeProduct(event) {
    // console.log(event.value);
    const productIndex = this.shopItems.findIndex(
      (item) => item.value === event.value,
    );
    // console.log(productIndex);
    this.selectedProduct = this.shopItems[productIndex].value;
    this.selectedImage = this.shopItems[productIndex].image;
    this.selectedPrice = this.shopItems[productIndex].price;
    this.selectedDiscount = this.shopItems[productIndex].discount;
    this.selectedItemId = this.shopItems[productIndex].item_id;
  }

  addNewSaleItem(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    if (value.quantity <= 0) {
      this.toastr.warning(
        "Please enter correct value for quantity!",
        "Quatity Not Correct!",
      );
      return;
    }
    value.item_id = this.selectedItemId;
    value.item_price = this.selectedPrice;
    value.discount = this.selectedDiscount;
    // console.log(this.sale.sales_id);
    // console.log(value);
    this.spinner.show();
    this.nadminSalesService.addSaleItem(this.sale.sales_id, value).subscribe(
      (response) => {
        this.spinner.hide();
        // console.log(response);
        if (response.status === 201) {
          this.toastr.success(
            "Your product has been added successfully!",
            "Product Added!",
          );
          // const tempShop = this.userShop;
          // const tempBranch = this.userBranch;
          // form.reset({
          //   userShop: tempShop,
          //   userBranch: tempBranch,
          // });
          // this.grandTotal += value.item_price;
          this.displayAddSale = false;
          this.getSalesDetails();
        } else {
          this.toastr.error(
            "There was a problem adding the Sale Item!",
            "Item Add Error!",
          );
        }
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.message, "Error!");
      },
    );
  }

  onRowEditInit(saleItem) {
    this.clonedProduct = { ...saleItem };
    // console.log(this.clonedProduct);
  }

  onRowEditCancel(user, index: number) {
    const itemIndex = this.saleDetails.findIndex(
      (item) => item.sales_details_id === this.clonedProduct.sales_details_id,
    );
    this.saleDetails[itemIndex] = this.clonedProduct;
    // this.shopItems = [...this.shopItems];
    this.clonedProduct = null;
    this.toastr.warning("Your edit has not been saved!", "Edit Cancelled!");
  }

  onRowEditSave(item) {
    const modifiedItem = item;
    // console.log(modifiedProduct);
    // Preloader
    this.recalculateGrandTotal();
    this.spinner.show();
    this.nadminSalesService
      .updateSalesItem(modifiedItem, this.total, this.sale.sales_id)
      .subscribe(
        (response) => {
          // console.log(response);
          this.spinner.hide();
          if (response.status === 201) {
            this.toastr.success(
              "Your edit has been saved!",
              "Save Successful!",
            );
            // this.getShopItems(this.userBranch);
          } else if (response.status === 406) {
            this.toastr.warning(
              "You have not changed anything!",
              "Nothing to save!",
            );
          } else {
            // console.log(response);
            this.toastr.error(
              "Your edit has not been saved or you have no edits!",
              "Save User Failed!",
            );
          }
        },
        (error) => {
          // this.getShopItems(this.userBranch);
          this.spinner.hide();
          this.toastr.error(error.error.message, "Error!");
        },
      );
  }

  onDeleteSalesItem(item) {
    this.displayModal = true;
    this.itemToBeDeleted = item;
  }

  deleteConfirmed() {
    this.displayModal = false;
    const itemIndex = this.saleDetails.findIndex(
      (item) => item.sales_details_id === this.itemToBeDeleted.sales_details_id,
    );
    this.saleDetails.splice(itemIndex, 1);
    this.recalculateGrandTotal();
    this.spinner.show();
    this.nadminSalesService
      .deleteSalesItem(
        this.itemToBeDeleted.sales_details_id,
        this.total,
        this.sale.sales_id,
      )
      .subscribe(
        (response) => {
          // console.log(response);
          this.spinner.hide();
          if (response.status === 204) {
            this.toastr.success(
              "Your edit has been saved!",
              "Save Successful!",
            );
            // this.getShopItems(this.userBranch);
          } else if (response.status === 406) {
            this.toastr.warning(
              "You have not changed anything!",
              "Nothing to save!",
            );
          } else {
            // console.log(response);
            this.toastr.error(
              "Your edit has not been saved or you have no edits!",
              "Save Failed!",
            );
          }
        },
        (error) => {
          // this.getShopItems(this.userBranch);
          this.spinner.hide();
          this.toastr.error(error.error.message, "Error!");
        },
      );
  }

  recalculateGrandTotal() {
    // this.grandTotal
    // {{((rowData.item_price * rowData.quantity)-rowData.discount).toFixed(2)}}
    this.grandTotal = 0;
    this.total = 0;
    this.saleDetails.forEach((element) => {
      this.total +=
        parseFloat(element.item_price) * parseFloat(element.quantity);
      this.grandTotal +=
        parseFloat(element.item_price) * parseFloat(element.quantity) -
        parseFloat(element.discount);
    });
    this.grandTotal +=
      parseFloat(this.sale.delivery_charge) -
      (this.sale.voucher_discount ? parseFloat(this.sale.voucher_discount) : 0);
    this.grandTotal = this.grandTotal.toFixed(2);
    this.total = this.total.toFixed(2);
  }
}
