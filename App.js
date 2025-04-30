import 'react-native-gesture-handler';
import { Provider } from 'react-redux'; 
import store from './App/screens/SignUpScreens/store_management/store';
import { StyleSheet, Text } from 'react-native';
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
import ReferFriends from './App/screens/InsideAppScreens/MenuScreens/ReferFriends';
import Earnings from './App/screens/InsideAppScreens/MenuScreens/Earnings';
import Help from './App/screens/InsideAppScreens/MenuScreens/Help';
import BestPerformance from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/BestPerformance';
import IDCard from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/IDCard';
import Documents from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents';
import LanguageSetting from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/LanguageSetting';
import ProfileHelp from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/ProfileHelp';
import { AlertsProvider } from './App/Context/AlertsContext';

import Wallet from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/Wallet';
import History from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/History';
import BankDetailsScreen from './App/screens/SignUpScreens/BankDetailsScreen';
import AadharCard_List from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/AadharCard_List';
import DriverLicence_list from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/DriverLicence_list';
import PanCard_List from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/PanCard_List';
import RC_List from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/RC_List';
import Today from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/Today';
import RateCard from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/RateCard';
import AllRateCards from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/RateCardItems/AllRateCards';
import Guidelines from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/Guidelines';
import RechargePage from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/RechargePage';
import BuddyRecharge from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/BuddyRecharge';

import AllTransactionPage from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/AllTransactionPage';
import PendingPage from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/PendingPage';
import LicenseImageChange from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/LicenseImageChange';
import LicenseFileChange from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/LicenseFileChange';
import RcImageChange from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/RcImageChange';
import RcFileChange from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/RcFileChange';
import BikeReference from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/ReferenceDetails/BikeReference';
import CarReference from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/ReferenceDetails/CarReference';
import AutoReference from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/ReferenceDetails/AutoReference';
import HistoryAll from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/HistoryScreens/HistoryAll';
import EarningsHelp from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/EarningsHelp';
import TransactionDetailsPage from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/WalletScreens/TransactionDetailsPage';
import IncentivesAndBonuses from './App/screens/InsideAppScreens/MenuScreens/IncentivesAndBonuses';
import DemandPlanner from './App/screens/InsideAppScreens/MenuScreens/DemandPlanner';
import IncentivesPage from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/IncentivesPage';
import IncentivesHelpPage from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/IncentivesHelpPage';
import Bonuses from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/Bonuses';
import WeeklyIncentives from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/WeeklyIncentives';
import DailyIncentives from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/DailyIncentives';
import SubscriptionDetails from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/SubscriptionDetails';
import SubscriptionHelp from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/SubscriptionHelp';
import ServiceManagerHelp from './App/screens/InsideAppScreens/MenuScreens/ServiceManagerScreens/ServiceManagerHelp';
import Notifications from './App/screens/InsideAppScreens/HomeScreens/Notifications';
import FavLocation from './App/screens/InsideAppScreens/HomeScreens/FavLocation';
import Rewards from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/Rewards';
import ServiceManager from './App/screens/InsideAppScreens/MenuScreens/ServiceManager';
import RewardsHelp from './App/screens/InsideAppScreens/MenuScreens/Incentives and bonuses screens/RewardsHelp';
import MyLoan from './App/screens/InsideAppScreens/MenuScreens/MyLoan';
import AadharImageChange from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/AadharImageChange';
import AadharFileChange from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/AadharFileChange';
import PanImageChange from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/PanImageChange';
import PanFileChange from './App/screens/InsideAppScreens/MenuScreens/ProfileDetailsPages/Documents_lists/PanFileChange';
import CompletedRides from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/CompletedRides';
import MissedOrders from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/MissedOrders';
import EarningsOnDatePage from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/HistoryScreens/EarningsOnDatePage';
import RidesSummary from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/HistoryScreens/RidesSummary';
import CancelledOrders from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/CancelledOrders';
import HistoryRides from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/HistoryScreens/HistoryRides';
import TodayAll from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/TodayAll';
import TodayRides from './App/screens/InsideAppScreens/MenuScreens/EarningScreens/TodaysScreens/TodayRides';
import RideAlertsPage from './App/screens/InsideAppScreens/RideAlertsPage';


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
      <AlertsProvider>
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
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="FavLocation" component={FavLocation} />
            <Stack.Screen name="ProfiledetailsPage" component={ProfiledetailsPage} />
            <Stack.Screen name="BestPerformance" component={BestPerformance} />
            <Stack.Screen name="IDCard" component={IDCard} />
            <Stack.Screen name="Documents" component={Documents} />
            <Stack.Screen name="LanguageSettings" component={LanguageSetting} />
            <Stack.Screen name="ProfileHelp" component={ProfileHelp} />
            <Stack.Screen name="ReferFriends" component={ReferFriends} />
            <Stack.Screen name="Earnings" component={Earnings} options={{ headerShown: false }} />
            <Stack.Screen name="MyLoan" component={MyLoan} />
            <Stack.Screen name="IncentivesAndBonuses" component={IncentivesAndBonuses} />
            <Stack.Screen name="ServiceManager" component={ServiceManager} options={{ headerShown: false }}/>
            <Stack.Screen name="DemandPlanner" component={DemandPlanner} />
            <Stack.Screen name="Help" component={Help} />

            <Stack.Screen name="AadharCard_List" component={AadharCard_List} />
            <Stack.Screen name="AadharImageChange" component={AadharImageChange} />
            <Stack.Screen name="AadharFileChange" component={AadharFileChange} />
            <Stack.Screen name="DriverLicence_list" component={DriverLicence_list}/>
            <Stack.Screen name="LicenseImageChange" component={LicenseImageChange} />
            <Stack.Screen name="LicenseFileChange" component={LicenseFileChange} />
            <Stack.Screen name="PanCard_List" component={PanCard_List}/>
            <Stack.Screen name="PanImageChange" component={PanImageChange}/>
            <Stack.Screen name="PanFileChange" component={PanFileChange}/>
            <Stack.Screen name="RC_List" component={RC_List} />
            <Stack.Screen name="RcImageChange" component={RcImageChange} />
            <Stack.Screen name="RcFileChange" component={RcFileChange} />

            {/* Earnings Screens */}
            <Stack.Screen name="RideAlertsPage" component={RideAlertsPage} />
            <Stack.Screen name="EarningsHelp" component={EarningsHelp} />
            <Stack.Screen name="Today" component={Today} options={{ headerShown: false }} />
            <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
            <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
            
            <Stack.Screen name="CompletedRides" component={CompletedRides} />
            <Stack.Screen name="MissedOrders" component={MissedOrders} />
            <Stack.Screen name="CancelledOrders" component={CancelledOrders} />
            
            <Stack.Screen name="TodayAll" component={TodayAll} />
            <Stack.Screen name="TodayRides" component={TodayRides} />
            
            <Stack.Screen name="RateCard" component={RateCard} />
            <Stack.Screen name="AllRateCards" component={AllRateCards} />
            <Stack.Screen name="Guidelines" component={Guidelines} options={{ headerShown: false }} />


            <Stack.Screen name="EarningsOnDatePage" component={EarningsOnDatePage} />
            <Stack.Screen name="RidesSummary" component={RidesSummary} options={{ headerShown: false }}  />


            <Stack.Screen name="RechargePage" component={RechargePage} options={{ headerShown: false }} />
            <Stack.Screen name="BuddyRecharge" component={BuddyRecharge}/>
            <Stack.Screen name="AllTransactionPage" component={AllTransactionPage} options={{ headerShown: false }} />
            <Stack.Screen name="TransactionDetailsPage" component={TransactionDetailsPage} options={{ headerShown: false }} />
            <Stack.Screen name="PendingPage" component={PendingPage} options={{ headerShown: false }} />

            <Stack.Screen name="BikeReference" component={BikeReference} />
            <Stack.Screen name="CarReference" component={CarReference} />
            <Stack.Screen name="AutoReference" component={AutoReference}/>

            <Stack.Screen name="HistoryAll" component={HistoryAll} />
           <Stack.Screen name="HistoryRides" component={HistoryRides} options={{ headerShown: false }} />


             {/*Incentives and Bonuses*/}
             <Stack.Screen name="IncentivesPage" component={IncentivesPage} options={{ headerShown: false }} /> 
             <Stack.Screen name="DailyIncentives" component={DailyIncentives} />
             <Stack.Screen name="WeeklyIncentives" component={WeeklyIncentives} />
             <Stack.Screen name="Bonuses" component={Bonuses} />
             <Stack.Screen name="IncentivesHelpPage" component={IncentivesHelpPage} />
             <Stack.Screen name="SubscriptionDetails" component={SubscriptionDetails} />
             <Stack.Screen name="SubscriptionHelp" component={SubscriptionHelp} />
            <Stack.Screen name="Rewards" component={Rewards}  options={{ headerShown: false }}/>
            <Stack.Screen name="RewardsHelp" component={RewardsHelp} />
             <Stack.Screen name="ServiceManagerHelp" component={ServiceManagerHelp} />
          </Stack.Navigator>

        </NavigationContainer>
       
      </AlertsProvider>
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
