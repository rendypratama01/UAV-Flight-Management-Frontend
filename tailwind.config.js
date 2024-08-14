const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    margin: {
      cl1: "50px",
      cl2: "100px",
      cl3: "150px",
      cl4: "200px",
      cl5: "250px",
      cl6: "300px",
      cl7: "350px",
      cl8: "400px",

      cr0: "25px",
      cr1: '50px',
      cr2: "100px",
      cr3: "150px",
      cr4: "200px",
      cr5: "250px",
      cr6: "300px",
      cr7: "350px",
      cr8: "400px",

      ct0: '25px',
      ct1: '50px',
      ct2: "100px",
      ct3: "150px",
      ct4: "200px",
      ct5: "250px",
      ct6: "300px",
      ct7: "350px",
      ct8: "400px",
      

      cb1: '50px',
      cb2: "100px",
      cb3: "150px",
      cb4: "200px",
      cb5: "250px",
      cb6: "300px",
      cb7: "350px",
      cb8: "400px",
    },
    colors: {
      new:{
        100: "#A6ABC8",
        200: "#5A6ACF",
        300: "#28317e",
      },
    },
    extend: {},
  },
  plugins: [],
});