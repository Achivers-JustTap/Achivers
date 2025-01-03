import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux'; 
import store from './App/screens/SignUpScreens/store_management/store';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
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
import ProfileHelp from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/ProfileHelp';


import Wallet from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/Wallet';
import History from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/History';
import BankDetailsScreen from './App/screens/SignUpScreens/BankDetailsScreen';
import AadharCard_List from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/AadharCard_List';
import DriverLicence_list from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/DriverLicence_list';
import PanCard_List from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/PanCard_List';
import RC_List from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/RC_List';
import Today from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/Today';
import All from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/All';
import BikeTaxi from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/BikeTaxi';
import ParcelDelivery from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/ParcelDelivery';
import RateCard from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/RateCard';
import Link from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/RateCardItems/Link';
import BikeLite from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/RateCardItems/BikeLite';
import C2C from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/RateCardItems/C2C';
import BikeMetro from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/RateCardItems/BikeMetro';
import SwiggyGinie from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/RateCardItems/SwiggyGinie';
import KPN from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/RateCardItems/KPN';
import Guidelines from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/Guidelines';
import RechargePage from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/RechargePage';
import BuddyRecharge from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/BuddyRecharge';
import AllTransactionPage from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/AllTransactionPage';
import PendingPage from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/PendingPage';
import LicenseImageChange from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/LicenseImageChange';
import LicenseFileChange from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/LicenseFileChange';
import RcImageChange from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/RcImageChange';
import RcFileChange from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/RcFileChange';
import Groceries from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/Groceries';
import BikeReference from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/ReferenceDetails/BikeReference';
import CarReference from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/ReferenceDetails/CarReference';
import AutoReference from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/ReferenceDetails/AutoReference';
import HistoryAll from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/HistoryScreens/HistoryAll';
import HistoryBikeTaxi from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/HistoryScreens/HistoryBikeTaxi';
import HistoryParcelDelivery from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/HistoryScreens/HistoryParcelDelivery';
import HistoryGroceries from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/HistoryScreens/HistoryGroceries';
import EarningsHelp from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/EarningsHelp';
import TransactionDetailsPage from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/TransactionDetailsPage';
import IncentivesAndBonuses from './App/screens/InsideAppScreens/MenuScreens/IncentivesAndBonuses';
import Rewards from './App/screens/InsideAppScreens/MenuScreens/Rewards';
import ServiceManager from './App/screens/InsideAppScreens/MenuScreens/ServiceManager';
import DemandPlanner from './App/screens/InsideAppScreens/MenuScreens/DemandPlanner';
import IncentivesPage from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/IncentivesPage';
import IncentivesHelpPage from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/IncentivesHelpPage';
import Bonuses from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/Bonuses';
import WeeklyIncentives from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/WeeklyIncentives';
import DailyIncentives from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/DailyIncentives';
import SubscriptionDetails from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/DailyIncentives';
import SubscriptionHelp from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/SubscriptionHelp';
const Stack = createStackNavigator();

export default function App() {

    const [fontsLoaded] = useFonts({
      'SofadiOne': require('./assets/fonts/SofadiOne-Regular.ttf'), // Load your font
    });
  
    if (!fontsLoaded) {
      return <Text>Loading...</Text>; // Show loading screen until font is loaded
    }
  
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
          <Stack.Screen name="ProfileHelp" component={ProfileHelp} />
          <Stack.Screen name="Inbox" component={Inbox} />
          <Stack.Screen name="ReferFriends" component={ReferFriends} />
          <Stack.Screen name="Oppurtunities" component={Oppurtunities} />
          <Stack.Screen name="Earnings" component={Earnings} options={{ headerShown: false }} />
          <Stack.Screen name="IncentivesAndBonuses" component={IncentivesAndBonuses} />
          <Stack.Screen name="Rewards" component={Rewards} />
          <Stack.Screen name="ServiceManager" component={ServiceManager} />
          <Stack.Screen name="DemandPlanner" component={DemandPlanner} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="TipsandInfo" component={TipsandInfo} />

          <Stack.Screen name="AadharCard_List" component={AadharCard_List} options={{ headerShown: false }}/>
          <Stack.Screen name="DriverLicence_list" component={DriverLicence_list} options={{ headerShown: false }}/>
          <Stack.Screen name="LicenseImageChange" component={LicenseImageChange} />
          <Stack.Screen name="LicenseFileChange" component={LicenseFileChange} />
          <Stack.Screen name="PanCard_List" component={PanCard_List} options={{ headerShown: false }}/>
          <Stack.Screen name="RC_List" component={RC_List} options={{ headerShown: false }}/>
          <Stack.Screen name="RcImageChange" component={RcImageChange} />
          <Stack.Screen name="RcFileChange" component={RcFileChange} />

          {/* Earnings Screens */}

          <Stack.Screen name="EarningsHelp" component={EarningsHelp} />
          <Stack.Screen name="Today" component={Today} options={{ headerShown: false }} />
          <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
          <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
           
          <Stack.Screen name="All" component={All} />
          <Stack.Screen name="BikeTaxi" component={BikeTaxi} options={{ headerShown: false }} />
          <Stack.Screen name="ParcelDelivery" component={ParcelDelivery} options={{ headerShown: false }} />
          <Stack.Screen name="Groceries" component={Groceries} options={{ headerShown: false }} />
          <Stack.Screen name="RateCard" component={RateCard} />
          <Stack.Screen name="Link" component={Link} />
          <Stack.Screen name="BikeLite" component={BikeLite} />
          <Stack.Screen name="C2C" component={C2C} />
          <Stack.Screen name="BikeMetro" component={BikeMetro} />
          <Stack.Screen name="SwiggyGinie" component={SwiggyGinie} />
          <Stack.Screen name="KPN" component={KPN} />
          <Stack.Screen name="Guidelines" component={Guidelines} options={{ headerShown: false }} />

          <Stack.Screen name="RechargePage" component={RechargePage} options={{ headerShown: false }} />
          <Stack.Screen name="BuddyRecharge" component={BuddyRecharge}/>
          <Stack.Screen name="AllTransactionPage" component={AllTransactionPage} options={{ headerShown: false }} />
          <Stack.Screen name="TransactionDetailsPage" component={TransactionDetailsPage} options={{ headerShown: false }} />
          <Stack.Screen name="PendingPage" component={PendingPage} options={{ headerShown: false }} />

          <Stack.Screen name="BikeReference" component={BikeReference} />
          <Stack.Screen name="CarReference" component={CarReference} />
          <Stack.Screen name="AutoReference" component={AutoReference}/>

          <Stack.Screen name="HistoryAll" component={HistoryAll} />
          <Stack.Screen name="HistoryBikeTaxi" component={HistoryBikeTaxi} options={{ headerShown: false }} />
          <Stack.Screen name="HistoryParcelDelivery" component={HistoryParcelDelivery} options={{ headerShown: false }} />
          <Stack.Screen name="HistoryGroceries" component={HistoryGroceries} options={{ headerShown: false }} />

           {/*Incentives and Bonuses*/}
           <Stack.Screen name="IncentivesPage" component={IncentivesPage} options={{ headerShown: false }} /> 
           <Stack.Screen name="DailyIncentives" component={DailyIncentives} />
           <Stack.Screen name="WeeklyIncentives" component={WeeklyIncentives} />
           <Stack.Screen name="Bonuses" component={Bonuses} />
           <Stack.Screen name="IncentivesHelpPage" component={IncentivesHelpPage} />
           <Stack.Screen name="SubscriptionDetails" component={SubscriptionDetails} />
           <Stack.Screen name="SubscriptionHelp" component={SubscriptionHelp} />
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
