import { expect, assert } from "chai";
import * as request from "request";
import { addNumbers, hello } from "../src/app";
import { product } from "../src/dao/mongo-schemas/product-schema";
import * as requester from "../src/handlers/requester";
import { Requester } from "../src/models/requester";

describe("App", () => {
  describe("hello()", () => {
    it("hello sould return hello", () => {
      let result = hello();
      assert.equal(result, "hello");
    });

    it("hello has to return a string", () => {
      let result = hello();
      assert.typeOf(result, "string");
    });
  });
  describe("addNumbers()", () => {
    it("addNUmber should be above 5", () => {
      let result = addNumbers(5, 5);
      assert.isAbove(result, 5);
    });

    it("addNumber sould return type number", () => {
      let result = addNumbers(5, 5);
      assert.typeOf(result, "number");
    });
  });
});

describe("getProducts()", () => {
  it("meu teste", async () => {
    let params = {
      host: "localhost",
      path: "/produtos",
      port: "8085",
      method: "GET",
    } as Requester;
    let products = await requester.REQUEST(params);
    console.log("passou");
    console.log(products);
    expect(products).to.be.instanceOf(Array);
  });
});
