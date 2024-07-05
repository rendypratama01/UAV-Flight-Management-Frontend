import image from "../assets/img/image.png";

const DetailKomponen = () => {
  return (
    <div className="absolute ml-cl7 mr-cr1 mt-ct1">
      <h3 className="text-3xl text-new-300">Komponen</h3>
      <p className="text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div className="flex justify-center items-center mt-ct1 mb-cb1"> 
        <img src={image} alt="Logo Detail Misi" width="400px" />
      </div>
    </div>
  )
}

export default DetailKomponen