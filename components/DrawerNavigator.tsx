import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
// Import other screens or navigators

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Stack" component={StackNavigator} />
      {/* Add other screens or navigators */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
