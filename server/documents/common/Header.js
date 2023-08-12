import BankDetails from "./BankDetails.js";

const Header = `
  <div id="pageHeader">
    <div style="margin-top: 20px; margin-bottom: 4px; display: flex; flex-direction: column; position: relative; justify-content: center;">
      <div style="position: absolute; right: 0.5rem; top:0.5rem; text-align: center; ">
        <img
          src="https://www.eurekaserv.com/wp-content/uploads/2021/01/NABL-India-Vector-Logo.png"
          width="40"
          height="50"
          style="margin-top: -20px;"
        />
        <span style="display: block; margin-top: -0.25rem; font-size: 0.6rem; line-height: 1rem; font-weight: 700; ">
          TC-9140
        </span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; ">
        <div style="font-size: 1.5rem; line-height: 1rem; font-weight: 500; ">
          ENGG RESEARCH LABS
        </div>
        <div style="font-size: 0.6rem; line-height: 1rem; ">
          (NABL Accredted)
        </div>
        <div style="font-size: 0.6rem; line-height: 1rem; ">          
          (MATERIAL TESTING AND GEO-TECHNICAL INVESTIGATION LAB)
        </div>
        <div style="font-size: 0.6rem; line-height: 1rem; text-align: center;">
          GROUND FLOOR, OSCAR GYM BUILDING, BABLIANA ROAD, GANGYAL, JAMMU -
          180010
        </div>
        <div style="font-size: 0.6rem; line-height: 1rem;">
          Contact: 94191-85696 | E-mail: erljmu@rediffmail.com | Website:
          enggresearchlabs.com
        </div>
      </div>
    </div>
    <hr>
    ${BankDetails}
    <hr>
  </div>

`;

export default Header;
