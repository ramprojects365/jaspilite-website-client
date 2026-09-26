import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { NgForm } from "@angular/forms";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

import { SadmincostingService } from "./sadmincosting.service";
import { SadminCostingExcelService } from "./sadmin-costing-excel.service";
import { UtilityService } from "../../../services/utilities.service";

@Component({
  selector: "app-sadmin-costing",
  templateUrl: "./sadmin-costing.component.html",
  styleUrls: ["./sadmin-costing.component.scss"],
})
export class SadminCostingComponent implements OnInit {
  cols: any[];
  userShops = [];
  userShop: string;
  userBranches = [];
  excelData = [];
  userBranch: string;
  costingStartDate: Date;
  costingStartDateForPrint: Date;
  costingEndDate: Date;
  costingEndDateForPrint: Date;
  displayInvoiceModal = false;
  sales = [];
  todayDate = new Date();
  grandTotal: any;
  deliveryTotal: any;
  totalDiscount: any;
  finalAmount: any;
  totalInvoiceAmount: any;
  minimartAmount: any;
  sst: any;
  noOfSales: any;
  fees: any;
  shopPercentage: any;
  printBtnEnabled: any;

  constructor(
    private router: Router,
    private SadmincostingService: SadmincostingService,
    private SadminCostingExcelService: SadminCostingExcelService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private utilityService: UtilityService,
    private title: Title,
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "salesIdString", header: "Sales ID" },
      { field: "displayName", header: "Name" },
      { field: "date", header: "Date" },
    ];
    this.noOfSales = 0;
    this.grandTotal = 0;
    this.sst = 0;
    this.deliveryTotal = 0;
    this.totalDiscount = 0;
    this.finalAmount = 0;
    this.totalInvoiceAmount = 0;
    this.minimartAmount = 0;
    this.fees = 0;
    this.printBtnEnabled = false;
    //this.shopPercentage = 0.00;
    this.costingStartDate = new Date();
    this.costingStartDateForPrint = new Date();
    this.costingEndDate = new Date();
    this.costingEndDateForPrint = new Date();
    this.todayDate.setDate(this.todayDate.getDate());
    this.userShops = this.getMockShops();
    this.userShop = this.userShops[0]?.value;
    this.userBranches = this.getMockBranches(this.userShop);
    this.userBranch = this.userBranches[0]?.value || "0";
    this.getShops();
    this.title.setTitle(
      "Mini Mart: Grocery delivery from Lulu Hypermarket, Modern Stores, UM Stores | Download today",
    );
  }
  changeShop(event) {
    this.getBranches(event.value);
  }
  changeBranch(event) {
    //this.getAllSales(event.value);
  }
  getShops() {
    this.SadmincostingService.getAllUsersShops().subscribe(
      (shops) => {
        const remoteShops = shops?.payload?.shops;
        if (Array.isArray(remoteShops) && remoteShops.length > 0) {
          this.userShops = remoteShops.map((item) => {
            return { label: item.shop_name, value: item.shop_id };
          });
          this.userShop = this.userShops[0]?.value;
          this.getBranches(this.userShop);
        }
      },
      () => {
        if (!Array.isArray(this.userShops) || this.userShops.length === 0) {
          this.userShops = this.getMockShops();
        }
        this.userShop = this.userShop || this.userShops[0]?.value;
        this.userBranches = this.getMockBranches(this.userShop);
        this.userBranch = this.userBranches[0]?.value || "0";
      },
    );
  }

  getBranches(shopId) {
    this.SadmincostingService.getAllUsersBranches(shopId).subscribe(
      (branches) => {
        const remoteBranches = branches?.payload?.branches;
        if (Array.isArray(remoteBranches) && remoteBranches.length > 0) {
          this.userBranches = remoteBranches.map((item) => {
            return { label: item.branch_name, value: item.branch_id };
          });
        } else {
          this.userBranches = this.getMockBranches(shopId);
        }
        this.userBranch = this.userBranches[0]?.value || "0";
      },
      () => {
        this.userBranches = this.getMockBranches(shopId);
        this.userBranch = this.userBranches[0]?.value || "0";
      },
    );
  }

  private getMockShops() {
    return [
      { label: "Mini Mart", value: "1" },
      { label: "Fresh Basket", value: "2" },
      { label: "Daily Needs", value: "3" },
    ];
  }

  private getMockBranches(shopId: string) {
    const map = {
      "1": [
        { label: "Brickfields", value: "102" },
        { label: "KL Downtown", value: "101" },
      ],
      "2": [
        { label: "PJ Section 14", value: "201" },
        { label: "Shah Alam", value: "202" },
      ],
      "3": [
        { label: "Ampang", value: "301" },
        { label: "Setapak", value: "302" },
      ],
    };

    return map[shopId] || [];
  }
  getSales(form: NgForm) {
    const value = form.value;

    this.shopPercentage = value.shopPercentage;

    var startDate = value.costingStartDate;
    var endDate = value.costingEndDate;

    startDate.setDate(startDate.getDate() + 1);
    this.costingStartDate = startDate.toISOString().slice(0, 10);
    this.costingStartDateForPrint = this.costingStartDate;

    endDate.setDate(endDate.getDate() + 2);
    this.costingEndDate = endDate.toISOString().slice(0, 10);
    endDate.setDate(endDate.getDate() - 1);
    this.costingEndDateForPrint = endDate.toISOString().slice(0, 10);

    this.SadmincostingService.getSales(
      value.userBranch,
      this.costingStartDate,
      this.costingEndDate,
    ).subscribe((sales) => {
      //console.log('sales in costing page ' + sales.payload.sales);
      this.sales = sales.payload.sales;

      this.noOfSales = 0;
      this.grandTotal = 0;
      this.deliveryTotal = 0;
      this.totalDiscount = 0;
      this.finalAmount = 0;
      this.minimartAmount = 0;
      this.fees = 0;
      if (this.sales.length > 0) {
        this.sales = sales.payload.sales.map((item) => {
          item.salesTotal = (
            parseFloat(item.total) + parseFloat(item.delivery_charge)
          ).toFixed(2);
          item.date = this.utilityService.getDateTimeFormatted(item.date);
          this.grandTotal += parseFloat(item.total);
          this.totalDiscount += parseFloat(item.discount);
          this.deliveryTotal += parseFloat(item.delivery_charge);
          return item;
        });
        this.grandTotal = this.grandTotal.toFixed(2);
        this.deliveryTotal = this.deliveryTotal.toFixed(2);
        this.totalDiscount = this.totalDiscount.toFixed(2);

        this.noOfSales = this.sales.length;
        this.fees = (this.grandTotal * this.shopPercentage) / 100;
        this.fees = this.fees.toFixed(2);
        this.finalAmount = (
          parseFloat(this.fees) - parseFloat(this.totalDiscount)
        ).toFixed(2);
        this.minimartAmount = (
          parseFloat(this.finalAmount) + parseFloat(this.deliveryTotal)
        ).toFixed(2);
        this.printBtnEnabled = true;
      }
      this.costingStartDate = new Date();
      this.costingEndDate = new Date();
      this.shopPercentage = "";
    });
  }
  printExcelSale() {
    this.excelData = this.sales.map((item) => {
      return {
        "Sale Id": item.salesIdString,
        "Display Name": item.displayName,
        Date: item.date,
        Total: item.total,
        Discount: item.discount,
        "Sales Total": item.salesTotal,
      };
    });
    this.SadminCostingExcelService.generateExcel(
      this.excelData,
      "Minimart-Report",
    );
  }
  printPDFSale() {
    const data = document.getElementById("contentToConvert");
    const pdf = new jsPDF(); // A4 size page of PDF
    const col = [
      "Sales Id",
      "Name",
      "Date",
      "Amount",
      "Delivery",
      "Discount",
      "Total",
    ];
    const rows = [];
    this.sales.forEach((element) => {
      const row = [
        element.salesIdString != "" ? element.salesIdString : "N/A",
        element.displayName.substring(0, 10),
        element.date,
        element.total,
        element.delivery_charge,
        element.discount,
        element.salesTotal,
      ];
      rows.push(row);
    });
    rows.push(["", "", "", "", "", "Sales Total", this.grandTotal]);
    rows.push(["", "", "", "", "", "Fees", this.fees]);
    rows.push(["", "", "", "", "", "Discount", this.totalDiscount]);
    rows.push(["", "", "", "", "", "Fees After Discount", this.finalAmount]);
    rows.push(["", "", "", "", "", "Total Delivery", this.deliveryTotal]);
    rows.push(["", "", "", "", "", "Invoice Amount", this.minimartAmount]);

    pdf.text("Minimart Report", 10, 10);
    pdf.setFontSize(10);
    const header = [];
    header.push("Shop : " + this.sales[0].branch_name);
    header.push(
      "Duration : " +
        this.costingStartDateForPrint +
        " - " +
        this.costingEndDateForPrint,
    );

    pdf.text(header, 10, 15);
    (pdf as any).autoTable(col, rows, {
      styles: {
        fontSize: 10,
        cellWidth: "wrap",
      },
      columnStyles: {
        2: {
          cellWidth: "auto",
          fillColor: [232, 252, 245],
        },
      },
      startY: 25,
    });
    pdf.save("minimart-report.pdf");
  }
  printInvoice(form: NgForm) {
    this.sst = 0;
    if (!form.valid) {
      return;
    }
    const value = form.value;
    this.sst = ((value.saleamount / 100) * 6).toFixed(2);

    const data = document.getElementById("contentToConvert");
    const pdf = new jsPDF();

    var mmlogo = new Image();
    mmlogo.src = "../../../../assets/img/common/minimart-logo.png";

    pdf.addImage(mmlogo, "png", 20, 10, 20, 20);
    pdf.setTextColor(64, 64, 64);
    pdf.setFont("Helvetica");
    pdf.setFontSize(18);
    pdf.setFont("bold");
    pdf.text("INVOICE", 90, 20);
    pdf.setFontSize(12);
    pdf.setFont("normal");
    pdf.text("(SSM No: 1470204-T)", 85, 27);
    pdf.setFontSize(13);
    pdf.setFont("bold");
    pdf.text("Bill To: " + value.companyname, 20, 46);
    pdf.text("Minimart Online Sdn Bhd", 120, 46);
    pdf.text("Address:", 20, 53);
    pdf.text("Address:", 120, 53);
    pdf.setFont("normal");
    pdf.setFontSize(12);
    pdf.text(value.companyaddressline1, 20, 58);
    pdf.text(value.companyaddressline2, 20, 63);
    pdf.text("Unit D-3A-4, Setiawalk, Puchong, Malaysia.", 120, 58);
    pdf.text("Tel: +60 10 544 9974", 120, 63);
    pdf.setFont("bold");
    pdf.text("InvoiceNo :", 120, 70);
    pdf.setFont("normal");
    pdf.text(value.invoicenumber, 142, 70);
    pdf.setFont("bold");
    pdf.text("Date :", 120, 77);
    pdf.setFont("normal");
    pdf.text(value.invoicedate, 142, 77);
    pdf.setFont("bold");
    pdf.text("For :", 120, 84);
    pdf.setFont("normal");
    pdf.text("Services", 142, 84);
    const col = ["S. no", "Description", "SST (6%)", "Amount (RM)"];
    const rows = [];
    rows.push([
      "1",
      "SAAS Services",
      this.sst,
      parseFloat(value.saleamount).toFixed(2),
    ]);
    rows.push([
      "2",
      "Delivery Charges",
      "0.00",
      parseFloat(value.deliveryamount).toFixed(2),
    ]);
    rows.push([
      "",
      "Total (Excl SST)",
      "",
      (parseFloat(value.saleamount) + parseFloat(value.deliveryamount)).toFixed(
        2,
      ),
    ]);
    rows.push(["", "Total SST", "", parseFloat(this.sst).toFixed(2)]);
    (pdf as any).autoTable(col, rows, {
      tableLineColor: [192, 192, 192],
      tableLineWidth: 0,
      theme: "grid",
      headStyles: {
        fontSize: 11,
        fontStyle: "bold",
        text: { minCellWidth: "wrap" },
        fillColor: [192, 192, 192],
        halign: "center",
      },
      bodyStyles: {
        text: { minCellWidth: "wrap" },
        fontSize: 10,
        halign: "center",
      },
      startY: 90,
    });
    const col1 = [
      "",
      "",
      "Total Amount: " +
        (
          parseFloat(value.saleamount) +
          parseFloat(value.deliveryamount) +
          parseFloat(this.sst)
        ).toFixed(2),
      "",
    ];
    const rows1 = [];
    (pdf as any).autoTable(col1, rows1, {
      tableLineColor: [192, 192, 192],
      tableLineWidth: 0.01,
      theme: "grid",
      headStyles: {
        fontSize: 12,
        fontStyle: "bold",
        text: { minCellWidth: "wrap" },
        fillColor: [192, 192, 192],
        halign: "center",
      },
      bodyStyles: {
        text: { minCellWidth: "wrap" },
        fontSize: 11,
        halign: "center",
      },
      startY: 128,
    });

    pdf.setFont("normal");
    pdf.setTextColor(64, 64, 64);
    pdf.setFontSize(12);
    pdf.text("All cheques are payable at Minimart Online Sdn Bhd.", 20, 146);
    pdf.text("For online payment Account No. 8010933529, CIMB Bank", 20, 154);
    pdf.setTextColor(160, 160, 160);
    pdf.text(
      "Note: This is computer genrated invoice no signature required",
      20,
      162,
    );
    pdf.setFont("bold");
    pdf.setTextColor(64, 64, 64);
    pdf.setFontSize(13);
    pdf.text("Thank you for your Business", 72, 170);

    pdf.save("minimart-invoice.pdf");
    this.displayInvoiceModal = false;
  }
  cancelInvoiceModal() {
    this.displayInvoiceModal = false;
  }
  getInvoice() {
    this.displayInvoiceModal = true;
  }
}
