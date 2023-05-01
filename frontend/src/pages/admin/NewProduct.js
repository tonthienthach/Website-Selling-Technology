import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../services/appApi";
import brandApi from "../../axios/brandApi";
import "./NewProduct.css";
import categoryApi from "../../axios/categoryApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateProducts } from "../../features/productSlice";

function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [listBrand, setListBrand] = useState([]);
  const [cpu, setCPU] = useState("");
  const [ram, setRAM] = useState("");
  const [rom, setROM] = useState("");
  const [vga, setVGA] = useState("");
  const [display, setDisplay] = useState("");
  const [battery, setBattery] = useState("");
  const [os, setOS] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    const getAllCategory = async () => {
      const { data } = await categoryApi.getListCategory();
      //   console.log(data.allCate);
      setListCategory(data.allCate);
    };
    getAllCategory();
  }, []);

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    // axios
    //   .delete(`/images/${imgObj.public_id}/`)
    //   .then((res) => {
    //     setImgToRemove(null);
    //     setImages((prev) =>
    //       prev.filter((img) => {
    //         return img.public_id !== imgObj.public_id;
    //       })
    //     );
    //   })
    //   .catch((e) => console.log(e));
  }

  const handleGetCategory = (e) => {
    const cateSelected = listCategory.filter(
      (item) => item.name === e.target.value
    );
    // console.log(cateSelected);
    setCategory(cateSelected[0]._id);
    const getListBrand = async (id) => {
      const { data } = await brandApi.getListBrandByCate(id);
      console.log(data);
      setListBrand(data.data);
    };
    getListBrand(cateSelected[0]._id);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !brand ||
      !cpu ||
      !ram ||
      !rom ||
      !vga ||
      !display ||
      !battery ||
      !os ||
      !weight ||
      !images.length
    ) {
      return alert("Please fill out all the fields");
    }
    createProduct({
      name,
      cate: category,
      brand,
      price,
      image: images,
      CPU: cpu,
      ram,
      rom,
      VGA: vga,
      display,
      battery,
      OS: os,
      weight,
      description,
    }).then(({ data }) => {
      if (data.success) {
        dispatch(updateProducts(data.data));
        toast.success("Create Product Successful");
        setTimeout(() => {
          navigate("/admin/products");
        }, 1500);
      }
    });
  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dtksctz3g",
        uploadPreset: "o2ijzzgc",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <Container>
      <Row>
        <h1 className="mt-4">Create a product</h1>
        {isSuccess && (
          <Alert variant="success">Product created with succcess</Alert>
        )}
        {isError && <Alert variant="danger">{error.data}</Alert>}
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price ($)"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              onChange={(e) => setBrand(e.target.value)}
            >
              <Form.Label>Brand</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select One --
                </option>
                {listBrand.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CPU</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CPU"
                value={cpu}
                required
                onChange={(e) => setCPU(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>RAM</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter RAM"
                value={ram}
                required
                onChange={(e) => setRAM(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ROM</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ROM"
                value={rom}
                required
                onChange={(e) => setROM(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>VGA</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter VGA"
                value={vga}
                required
                onChange={(e) => setVGA(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} />
                    {imgToRemove != image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess}>
                Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Form.Group className="mb-3" onChange={handleGetCategory}>
            <Form.Label>Category</Form.Label>
            <Form.Select>
              <option disabled selected>
                -- Select One --
              </option>
              {listCategory.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Display</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Display"
              value={display}
              required
              onChange={(e) => setDisplay(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Battery</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Battery"
              value={battery}
              required
              onChange={(e) => setBattery(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>OS</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OS"
              value={os}
              required
              onChange={(e) => setOS(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Weight"
              value={weight}
              required
              onChange={(e) => setWeight(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Product description"
              style={{ height: "100px" }}
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}

export default NewProduct;
