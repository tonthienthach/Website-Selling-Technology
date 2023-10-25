import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "../../services/appApi";
import brandApi from "../../axios/brandApi";
import "./EditProductPage.css";
import categoryApi from "../../axios/categoryApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateProducts } from "../../features/productSlice";
import productApi from "../../axios/productApi";
import Loading from "../../components/Loading";

function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [brand, setBrand] = useState(null);
  const [listBrand, setListBrand] = useState([]);
  const [cpu, setCPU] = useState("");
  const [ram, setRAM] = useState("");
  const [rom, setROM] = useState("");
  const [vga, setVGA] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [display, setDisplay] = useState("");
  const [battery, setBattery] = useState("");
  const [os, setOS] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState(null);
  const [camera1, setCamera1] = useState("");
  const [checkPhone, setCheckPhone] = useState(false);
  const [camera2, setCamera2] = useState("");
  const [other, setOther] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateProduct, { isError, error, isLoading, isSuccess }] =
    useUpdateProductMutation();

  useEffect(() => {
    const getProduct = async (id) => {
      const res = await productApi.getProductByID(id);
      setProduct(res.data.data);
      setName(res.data.data.name);
      setPrice(res.data.data.price);
      setSalePrice(res.data.data.salePrice);
      setDisplay(res.data.data.display);
      setBattery(res.data.data.battery);
      setCPU(res.data.data.CPU);
      setOS(res.data.data.OS);
      setRAM(res.data.data.ram);
      setROM(res.data.data.rom);
      setVGA(res.data.data.VGA);
      setQuantity(res.data.data.quantity);
      setWeight(res.data.data.weight);
      setImages(res.data.data.image);
      setOther(res.data.data.other);
      setDescription(res.data.data.description);
      const cate = await categoryApi.getCategoryByID(res.data.data.cate);
      setCategory(cate.data.data);
      if (cate.data.data.name === "Laptop") {
        setCheckPhone(false);
      } else {
        setCheckPhone(true);
        setCamera1(res.data.data.camera1);
        setCamera2(res.data.data.camera2);
      }
      const { data } = await brandApi.getListBrandByCate(cate.data.data._id);
      setListBrand(data.data);
      const brandPrev = data.data.filter(
        (item) => item._id === res.data.data.brand
      );
      setBrand(brandPrev[0]);
      // console.log(brandPrev[0]);
    };
    getProduct(id);
    const getAllCategory = async () => {
      const { data } = await categoryApi.getListCategory();
      // console.log(data.allCate);
      setListCategory(data.allCate);
    };
    getAllCategory();
  }, [id]);

  // console.log(name);

  if (!product) {
    return <Loading />;
  }

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
    setCategory(cateSelected[0]);
    console.log(category);
    const getListBrand = async (id) => {
      const { data } = await brandApi.getListBrandByCate(id);
      // console.log(data);
      setListBrand(data.data);
    };
    getListBrand(cateSelected[0]._id);
  };

  const handleGetBrand = (e) => {
    const brandSelected = listBrand.filter(
      (item) => item._id === e.target.value
    );
    console.log(brandSelected);
    setBrand(brandSelected[0]);
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
      !quantity ||
      !display ||
      !battery ||
      !os ||
      !weight ||
      !images.length
    ) {
      return alert("Please fill out all the fields");
    }
    if (checkPhone) {
      if (!camera1 || !camera2) {
        return alert("Please fill out all the fields");
      }
      updateProduct({
        id,
        name,
        cate: category._id,
        brand: brand._id,
        price,
        salePrice,
        image: images,
        CPU: cpu,
        ram,
        rom,
        VGA: vga,
        display,
        battery,
        OS: os,
        weight,
        camera1,
        camera2,
        description,
        quantity,
        other,
      })
        .then(({ data }) => {
          if (data.success) {
            // console.log(data.data);
            dispatch(updateProducts(data.data));
            toast.success("Update Product Successful");
            setTimeout(() => {
              navigate("/admin/products");
            }, 1500);
          }
        })
        .catch(({ data }) => {
          toast.error(data.message);
        });
    } else {
      updateProduct({
        id,
        name,
        cate: category._id,
        brand: brand._id,
        price,
        salePrice,
        image: images,
        CPU: cpu,
        ram,
        rom,
        VGA: vga,
        quantity,
        display,
        battery,
        OS: os,
        weight,
        description,
      })
        .then(({ data }) => {
          if (data.success) {
            // console.log(data.data);
            dispatch(updateProducts(data.data));
            toast.success("Update Product Successful");
            setTimeout(() => {
              navigate("/admin/products");
            }, 1500);
          }
        })
        .catch(({ data }) => {
          toast.error(data.message);
        });
    }
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
      <Row className="mb-4">
        <h1 className="mt-4">Update a product</h1>
        {isSuccess && (
          <Alert variant="success">Product updated with succcess</Alert>
        )}
        {isError && <Alert variant="danger">{error.data}</Alert>}
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }}>
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
            <Form.Group className="mb-3">
              <Form.Label>Sale Price($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price ($)"
                value={salePrice}
                required
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" onChange={handleGetBrand}>
              <Form.Label>Brand</Form.Label>
              <Form.Select>
                <option disabled selected>
                  {brand?.name}
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
            {checkPhone && (
              <Form.Group className="mb-3">
                <Form.Label>Camera 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Camera"
                  value={camera1}
                  required
                  onChange={(e) => setCamera1(e.target.value)}
                />
              </Form.Group>
            )}
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
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Quantity"
                value={quantity}
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} alt="" />
                    {imgToRemove !== image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Form style={{ width: "100%" }}>
            <Form.Group className="mb-3" onChange={handleGetCategory}>
              <Form.Label>Category</Form.Label>
              <Form.Select>
                <option disabled selected>
                  {category?.name}
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
            {checkPhone && (
              <Form.Group className="mb-3">
                <Form.Label>Camera 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Camera"
                  value={camera2}
                  required
                  onChange={(e) => setCamera2(e.target.value)}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Other</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Other"
                value={other}
                required
                onChange={(e) => setOther(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product description"
                style={{ height: "200px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Button
              className="position-absolute bottom-0 end-0 mb-4 mr-3"
              type="submit"
              disabled={isLoading || isSuccess}
            >
              Update Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProductPage;
