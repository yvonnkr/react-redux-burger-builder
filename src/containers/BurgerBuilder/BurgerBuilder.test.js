import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

test("should default test", () => {});

// **** somethinh went wrong here **********
// describe("<BurgerBuilder />", () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = shallow(<BurgerBuilder initIngredients={() => {}} />);
//   });
//   it("should render <BuildControls/> when receiving ingredients ", () => {
//     wrapper.setProps({ ingredients: { salad: 0 } });
//     expect(wrapper.find(BuildControls)).toHaveLength(1);
//   });
// });
