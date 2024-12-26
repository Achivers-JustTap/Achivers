import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux'; 
import store from './App/screens/SignUpScreens/store_management/store';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './App/screens/SignUpScreens/WelcomeScreen';
import WhichVehicleScreen from './App/screens/SignUpScreens/WhichVehicleScreen';
import MobileOTPScreen from './App/screens/SignUpScreens/MobileOTPScreen';
import MobileOTPVerifyScreen from './App/screens/SignUpScreens/MobileOTPVerifyScreen';
import ProfileDetailsScreen from './App/screens/SignUpScreens/ProfileDetails';
import TakeSelfie from './App/screens/SignUpScreens/TakeSelfie';
import ProfileImageScreen from './App/screens/SignUpScreens/ProfileImageScreen';
import AadharUpload from './App/screens/SignUpScreens/AadharUpload';
import AadharImageUpload from './App/screens/SignUpScreens/AadharImageUpload';
import AadharUploadFromFile from './App/screens/SignUpScreens/AadharUploadFromFile';
import PanCard from './App/screens/SignUpScreens/PanCard';
import PanCardUpload from './App/screens/SignUpScreens/PanCardUpload';
import PanCardUploadFromFile from './App/screens/SignUpScreens/PanCardUploadFromFile';
import DriverLicense from './App/screens/SignUpScreens/DriverLicense';
import DrivingLicenseUpload from './App/screens/SignUpScreens/DrivingLicenseUpload';
import LicenseImageUpload from './App/screens/SignUpScreens/LicenseImageUpload';
import RC from './App/screens/SignUpScreens/RC';
import RCUploadFromFiles from './App/screens/SignUpScreens/RCUploadFromFiles';
import RCUpload from './App/screens/SignUpScreens/RCUpload';
import Processing from './App/screens/SignUpScreens/Processing';
import FileDetailsScreen from './App/screens/SignUpScreens/FileDetailsScreen';
import TabNavigationComponent from './App/screens/InsideAppScreens/TabNavigationComponent';
import { UserLocationProvider } from './App/Context/UserLocationContext';
import ProfiledetailsPage from './App/screens/InsideAppScreens/ProfiledetailsPage';
import Inbox from './App/screens/InsideAppScreens/MenuScreens/Inbox';
import ReferFriends from './App/screens/InsideAppScreens/MenuScreens/ReferFriends';
import Oppurtunities from './App/screens/InsideAppScreens/MenuScreens/Oppurtunities';
import Earnings from './App/screens/InsideAppScreens/MenuScreens/Earnings';
import Help from './App/screens/InsideAppScreens/MenuScreens/Help';
import TipsandInfo from './App/screens/InsideAppScreens/MenuScreens/Tips&Info';
import BestPerformance from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/BestPerformance';
import IDCard from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/IDCard';
import Documents from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents';
import LanguageSetting from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/LanguageSetting';

import Wallet from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/Wallet';
import History from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/History';
import BankDetailsScreen from './App/screens/SignUpScreens/BankDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}> 
    <UserLocationProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Initial Sign Up Screens */}
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="WhichVehicleScreen" component={WhichVehicleScreen} />
          <Stack.Screen name="MobileOTPScreen" component={MobileOTPScreen} />
          <Stack.Screen name="MobileOTPVerifyScreen" component={MobileOTPVerifyScreen} />
          <Stack.Screen name="ProfileDetailsScreen" component={ProfileDetailsScreen} />
          <Stack.Screen name="TakeSelfie" component={TakeSelfie} />
          <Stack.Screen name="ProfileImageScreen" component={ProfileImageScreen} />
          <Stack.Screen name="AadharUpload" component={AadharUpload} />
          <Stack.Screen name="AadharImageUpload" component={AadharImageUpload} />
          <Stack.Screen name="AadharUploadFromFile" component={AadharUploadFromFile} />
          <Stack.Screen name="PanCard" component={PanCard} />
          <Stack.Screen name="PanCardUpload" component={PanCardUpload} />
          <Stack.Screen name="PanCardUploadFromFile" component={PanCardUploadFromFile} />
          <Stack.Screen name="DriverLicense" component={DriverLicense} />
          <Stack.Screen name="DrivingLicenseUpload" component={DrivingLicenseUpload} />
          <Stack.Screen name="LicenseImageUpload" component={LicenseImageUpload} />
          <Stack.Screen name="RC" component={RC} />
          <Stack.Screen name="RCUploadFromFiles" component={RCUploadFromFiles} />
          <Stack.Screen name="RCUpload" component={RCUpload} />
          <Stack.Screen name="BankDetailsScreen" component={BankDetailsScreen} />
          <Stack.Screen name="Processing" component={Processing} />
          <Stack.Screen name="FileDetailsScreen" component={FileDetailsScreen} />

          {/* Home Tab Navigation */}
          <Stack.Screen name="HomeTabs" component={TabNavigationComponent} options={{ headerShown: false }} />
          <Stack.Screen name="ProfiledetailsPage" component={ProfiledetailsPage} />
          <Stack.Screen name="BestPerformance" component={BestPerformance} />
          <Stack.Screen name="IDCard" component={IDCard} />
          <Stack.Screen name="Documents" component={Documents} />
          <Stack.Screen name="LanguageSettings" component={LanguageSetting} />
          <Stack.Screen name="Inbox" component={Inbox} />
          <Stack.Screen name="ReferFriends" component={ReferFriends} />
          <Stack.Screen name="Oppurtunities" component={Oppurtunities} />
          <Stack.Screen name="Earnings" component={Earnings} options={{ headerShown: false }} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="TipsandInfo" component={TipsandInfo} />

          <Stack.Screen name="AadharCard_List" component={AadharCard_List} />
          <Stack.Screen name="DriverLicence_list" component={DriverLicence_list} />
          <Stack.Screen name="PanCard_List" component={PanCard_List} />
          <Stack.Screen name="RC_List" component={RC_List} />

          {/* Earnings Screens */}
          <Stack.Screen name="Today" component={Today} options={{ headerShown: false }} />
          <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
          <Stack.Screen name="History" component={History} options={{ headerShown: false }} />

          <Stack.Screen name="All" component={All} />
          <Stack.Screen name="BikeTaxi" component={BikeTaxi} options={{ headerShown: false }} />
          <Stack.Screen name="ParcelDelivery" component={ParcelDelivery} options={{ headerShown: false }} />
          <Stack.Screen name="Groceries" component={Gorceries} options={{ headerShown: false }} />
          <Stack.Screen name="RateCard" component={RateCard} />
          <Stack.Screen name="Link" component={Link} />
          <Stack.Screen name="BikeLite" component={BikeLite} />
          <Stack.Screen name="C2C" component={C2C} />
          <Stack.Screen name="BikeMetro" component={BikeMetro} />
          <Stack.Screen name="SwiggyGinie" component={SwiggyGinie} />
          <Stack.Screen name="KPN" component={KPN} />
          <Stack.Screen name="Guidelines" component={Guidelines} options={{ headerShown: false }} />

          <Stack.Screen name="RechargePage" component={RechargePage} options={{ headerShown: false }} />
          <Stack.Screen name="BuddyRecharge" component={BuddyRecharge} options={{ headerShown: false }} />
          <Stack.Screen name="ReferencePage" component={ReferencePage} options={{ headerShown: false }} />
          <Stack.Screen name="AllTransactionPage" component={AllTransactionPage} options={{ headerShown: false }} />
          <Stack.Screen name="PendingPage" component={PendingPage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserLocationProvider>
    </Provider>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
