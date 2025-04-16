import React, { useState } from "react";
import Select from "react-select";
import MenuList from "../../components/menu";

function AddRowTable() {
  const products = [
    {
      saleNumber: 1,
      description: "Nike Air Max 270",
      code: "NK-AM-270",
      color: "Black/White",
    },
    {
      saleNumber: 2,
      description: "Apple iPhone 13 Pro",
      code: "AP-IP-13P",
      color: "Space Gray",
    },
    {
      saleNumber: 3,
      description: "Sony 4K Smart TV",
      code: "SN-TV-4K",
      color: "Black",
    },
    {
      saleNumber: 4,
      description: "Levi's 501 Original Fit Jeans",
      code: "LV-501-OF",
      color: "Dark Blue",
    },
    {
      saleNumber: 5,
      description: "Samsung Galaxy S22 Ultra",
      code: "SM-GS-22U",
      color: "Phantom Black",
    },
    {
      saleNumber: 6,
      description: "Adidas Superstar Sneakers",
      code: "AD-SS-01",
      color: "White/Black",
    },
    {
      saleNumber: 7,
      description: "Canon EOS Rebel T8i Camera",
      code: "CN-ER-T8I",
      color: "Black",
    },
    {
      saleNumber: 8,
      description: "HP Envy x360 Laptop",
      code: "HP-ENV-X360",
      color: "Silver",
    },
    {
      saleNumber: 9,
      description: "Ray-Ban Aviator Sunglasses",
      code: "RB-AV-01",
      color: "Gold/Brown",
    },
    {
      saleNumber: 10,
      description: "Xbox Series X Console",
      code: "XB-SX-01",
      color: "Black",
    },
  ];

  const [saleItems, setSaleItems] = useState([]);
  const [sales, setSales] = useState([]);

  const handleProductSelection = (selectedOption) => {
    const selectedProduct = products.find(
      (product) => product.saleNumber === selectedOption.value
    );

    if (selectedProduct) {
      setSaleItems((prevItems) => [
        ...prevItems,
        {
          quantity: "",
          price: "",
          description: selectedProduct.description,
          code: selectedProduct.code,
          total: "",
          commission: "",
          color: selectedProduct.color,
        },
      ]);
    }
  };

  const addNewRow = () => {
    setSaleItems([
      ...saleItems,
      {
        quantity: "",
        price: "",
        description: "",
        code: "",
        total: "",
        commission: "",
      },
    ]);
  };

  const removeCurrentRow = (index) => {
    setSaleItems(saleItems.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, event) => {
    const { name, value } = event.target;
    const items = [...saleItems];
    items[index][name] = value;
    setSaleItems(items);
  };

  const handleEnterSale = () => {
    setSales([...sales, saleItems]); // Add current saleItems to sales
    setSaleItems([]); // Reset saleItems for a new entry
  };

  const productOptions = products.map((product) => ({
    value: product.saleNumber,
    product,
    label: (
      <div>
        <span>{`${product.saleNumber} — ${product.description} (${product.code}) | [${product.color}]`}</span>
      </div>
    ),
  }));

  const filterOption = ({ label, value, data }, input) => {
    if (input) {
      const searchTerm = input.toLowerCase();
      return (
        data.product.saleNumber.toLowerCase().includes(searchTerm) ||
        data.product.description.toLowerCase().includes(searchTerm) ||
        data.product.code.toLowercase().includes(searchTerm)
      );
    }
    return true;
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };
  return (
    <>
      <MenuList />
      <div>
        <label>Select The Product:</label>
        <label>Product No. — Description (Code) | [Colour]</label>
        <Select
          styles={customStyles}
          options={productOptions}
          filterOption={filterOption}
          onChange={handleProductSelection}
          placeholder="Type to search..."
          isSearchable={true}
        />

        <div>
          <button
            onClick={addNewRow}
            style={{ cursor: "pointer" }}
            className="addbtn"
          >
            Add item
          </button>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Code</th>
                <th>Color</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Commission</th>
              </tr>
            </thead>
            <tbody>
              {saleItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.code}</td>
                  <td>{item.color}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="price"
                      name="price"
                      value={item.price}
                      onChange={(e) => handleRowChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="quantity"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleRowChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="total"
                      name="total"
                      value={item.total}
                      onChange={(e) => handleRowChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="commission"
                      name="commission"
                      value={item.commission}
                      onChange={(e) => handleRowChange(index, e)}
                    />
                  </td>
                  <td
                    onClick={() => removeCurrentRow(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <button className="deletebtn">
                      <i className="material-icons">delete</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
          <button
            onClick={handleEnterSale}
            style={{ marginTop: "10px", cursor: "pointer" }}
            className="enterSaleBtn"
          >
            Enter Sale
          </button>
        </div>
        {sales.length > 0 && (
          <div>
            <h2>Receipt</h2>
            {sales.map((sale, index) => (
              <div key={index}>
                <h3>Sale #{index + 1}</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Code</th>
                      <th>Color</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sale.map((item, i) => (
                      <tr key={i}>
                        <td>{item.description}</td>
                        <td>{item.code}</td>
                        <td>{item.color}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.total}</td>
                        <td>{item.commission}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AddRowTable;
