import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavItem from "./NavItem/NavItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should render two <NavigationItem /> elements if NOT authenticated", () => {
    // const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });
  it("should render three <NavigationItem /> elements if Authenticated", () => {
    // wrapper = shallow(<NavigationItems isAuthenticated={true} />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });
  it("should render Logout NavItem if Authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(
      true
    );
  });
});
