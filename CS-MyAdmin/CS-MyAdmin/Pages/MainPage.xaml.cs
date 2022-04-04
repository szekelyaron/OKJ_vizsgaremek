using System;
using System.Collections.Generic;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using CS_MyAdmin.Pages;
using System.Collections.ObjectModel;
using CS_MyAdmin.Models;
using System.Linq;
using System.Globalization;
using System.Configuration;
using MySqlConnector;
using System.ComponentModel;
using System.Text.RegularExpressions;

namespace CS_MyAdmin.Pages
{
    /// <summary>
    /// Interaction logic for MainPage.xaml
    /// </summary>
    public partial class MainPage : Page
    {
        ObservableCollection<AutoModel> autok = new ObservableCollection<AutoModel>();
        ObservableCollection<GumiModel> gumik = new ObservableCollection<GumiModel>();
        ObservableCollection<InfoModel> infok = new ObservableCollection<InfoModel>();

        void resetSP(StackPanel Stackname)
        {
            List<Object> spanels = new List<Object>();

            foreach (Object vizsgaltItem in Stackname.Children)
            {
                if (vizsgaltItem.GetType() == typeof(StackPanel))
                {
                    spanels.Add(vizsgaltItem);
                }

            }

            foreach (StackPanel spanel in spanels)
            {
                foreach (Control item in spanel.Children)
                {
                    if (item.GetType() == typeof(TextBox))
                    {
                        ((TextBox)item).Text = string.Empty;
                    }
                    else if (item.GetType() == typeof(ComboBox))
                    {
                        ((ComboBox)item).SelectedIndex = 0;
                    }
                    else if (item.GetType() == typeof(DatePicker))
                    {
                        ((DatePicker)item).SelectedDate = DateTime.Now;
                    }
                }
            }
        }

        public MainPage()
        {
            InitializeComponent();

            autok = AutoModel.select();
            gumik = GumiModel.select();
            infok = InfoModel.select();
            DG_adatok.ItemsSource = autok;
            LBL_recordCount.Content = "Rekordok száma: " + DG_adatok.Items.Count.ToString();


            string[] dbItems = {"Autók", "Gumiabroncsok", "Info"};
            string[] gumiItems = {"Nyári","Téli","Négyévszakos" };
            string[] allapotItems = {"Alig használt","Frissen felújított","Használt","Enyhén sérült","Sérült" };
            string[] okmanyItems = {"Érvényes magyar okmányokkal" ,"Lejárt magyar okmányokkal" ,"Külföldi okmányokkal" ,"Okmányok nélkül"};
            string[] torottItems = {"Sérülésmentes", "Apró sérülések", "Eleje sérült", "Hátulja sérült", "Súlyosan sérült"};
            cb_databases.ItemsSource = dbItems;
            cb_databases.SelectedIndex = 0;
            CB_GumiEvszak.ItemsSource = gumiItems;
            CB_GumiEvszak.SelectedIndex = 0;
            CB_GumiInfo.ItemsSource = gumiItems;
            CB_GumiInfo.SelectedIndex = 0;
            CB_allapot.ItemsSource = allapotItems;
            CB_allapot.SelectedIndex = 0;
            CB_okmanyok.ItemsSource = okmanyItems;
            CB_okmanyok.SelectedIndex = 0;
            CB_Torott.ItemsSource = torottItems;
            CB_Torott.SelectedIndex = 0;

            for (int i = 1; i < 11; i++)
            {
                CB_megbizhatosag.Items.Add(i);
                CB_GumiKategoria.Items.Add(i);
            }
            CB_megbizhatosag.SelectedIndex = 0;
            CB_GumiKategoria.SelectedIndex = 0;

            DP_muszaki.SelectedDate = DateTime.Today;

            CB_szervkönyv.Items.Add("Nem");
            CB_szervkönyv.Items.Add("Igen");
            CB_szervkönyv.SelectedIndex = 0;


            CB_autoAzon.Items.Clear();
            foreach (var item in autok)
            {
                CB_autoAzon.Items.Add(item.aId + ":" + " " + item.gyarto + " " + item.tipus);
            }
            CB_autoAzon.SelectedIndex = 0;
            
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (cb_databases.SelectedIndex == 0)
            {
                foreach (var item in autok)
                {
                    AutoModel.update(item.aId, item.gyarto, item.tipus, item.megbizhatosag, item.tipusHiba);

                }
                autok = AutoModel.select();
                DG_adatok.ItemsSource = autok;

            }
            else if(cb_databases.SelectedIndex == 1)
            {
                foreach (var item in gumik)
                {
                    GumiModel.update(item.gId, item.gyarto, item.evszak, item.kategoria, item.ar, item.atmero, item.oldalFal, item.szelesseg);
                }
                gumik = GumiModel.select();
                DG_adatok.ItemsSource = gumik;
            }
            else if (cb_databases.SelectedIndex == 2)
            {
                foreach (var item in infok)
                {
                    InfoModel.update(item.IID, item.rendszam, item.alvazszam, item.futottKm, item.evJarat, item.allapot,
                        item.szervKonyv, item.okmanyok, item.muszaki, item.GumiAbroncs, item.AutoID, item.kepcim, item.torott);
                    infok = InfoModel.select();
                    DG_adatok.ItemsSource = infok;
                }
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_adatok.Items.Count.ToString();

        }


        private void cb_databases_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (cb_databases.SelectedIndex == 0)
            {
                autok = AutoModel.select();
                DG_adatok.ItemsSource = autok;

                SP_infokInsert.Visibility = Visibility.Collapsed;
                SP_gumikInsert.Visibility = Visibility.Collapsed;
                SP_autokInsert.Visibility = Visibility.Visible;
            }
            if (cb_databases.SelectedIndex == 1)
            {
                gumik = GumiModel.select();
                DG_adatok.ItemsSource = gumik;

                SP_infokInsert.Visibility = Visibility.Collapsed;
                SP_autokInsert.Visibility = Visibility.Collapsed;
                SP_gumikInsert.Visibility = Visibility.Visible;
            }
            if (cb_databases.SelectedIndex == 2)
            {
                infok = InfoModel.select();
                DG_adatok.ItemsSource = infok;

                CB_autoAzon.Items.Clear();
                foreach (var item in autok)
                {
                    CB_autoAzon.Items.Add(item.aId + ":" + " " + item.gyarto + " " + item.tipus);
                }
                CB_autoAzon.SelectedIndex = 0;

                SP_autokInsert.Visibility = Visibility.Collapsed;
                SP_gumikInsert.Visibility = Visibility.Collapsed;
                SP_infokInsert.Visibility = Visibility.Visible;
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_adatok.Items.Count.ToString();
        }
        private void BTN_insertAuto_Click(object sender, RoutedEventArgs e)
        {
            if (TB_gyarto.Text != "" && TB_tipus.Text != "" && TB_tipushiba.Text != "")
            {
                AutoModel.insert(TB_gyarto.Text, TB_tipus.Text, Convert.ToInt32(CB_megbizhatosag.SelectedItem), TB_tipushiba.Text);

                autok = AutoModel.select();
                DG_adatok.ItemsSource = autok;
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_adatok.Items.Count.ToString();
            resetSP(SP_autokInsert);

        }
        private void BTN_insertGumi_Click(object sender, RoutedEventArgs e)
        {
            if (TB_GumiGyarto.Text != "" && TB_GumiAr.Text != "" && TB_GumiAtmero.Text != "" && TB_GumiOldalfal.Text != "" && TB_GumiSzelesseg.Text != "")
            {
                GumiModel.insert(TB_GumiGyarto.Text, CB_GumiEvszak.SelectedItem.ToString(), Convert.ToInt32(CB_GumiKategoria.SelectedItem), int.Parse(TB_GumiAr.Text), Convert.ToInt32(TB_GumiAtmero.Text), Convert.ToInt32(TB_GumiOldalfal.Text), Convert.ToInt32(TB_GumiSzelesseg.Text));

                gumik = GumiModel.select();
                DG_adatok.ItemsSource = gumik;
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_adatok.Items.Count.ToString();
            resetSP(SP_gumikInsert);
        }

        private void BTN_insertInfo_Click(object sender, RoutedEventArgs e)
        {
            string[] splittedText = CB_autoAzon.SelectedItem.ToString().Split(':');
            if (TB_Rendszam.Text != "" && TB_Alvazszam.Text != "" && TB_FutottKm.Text != "")
            {
                InfoModel.insert(TB_Rendszam.Text, TB_Alvazszam.Text, Convert.ToInt32(TB_FutottKm.Text), int.Parse(TB_Evjarat.Text), CB_allapot.SelectedItem.ToString(), CB_szervkönyv.SelectedIndex, CB_okmanyok.SelectedItem.ToString(), DP_muszaki.SelectedDate.Value, CB_GumiInfo.SelectedItem.ToString(),
                    Convert.ToInt32(splittedText[0]), TB_kepCim.Text, CB_Torott.SelectedItem.ToString());

                infok = InfoModel.select();
                DG_adatok.ItemsSource = infok;
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_adatok.Items.Count.ToString();
            resetSP(SP_infokInsert);
        }

        private void BTN_Delete_Click(object sender, RoutedEventArgs e)
        {
            if (cb_databases.SelectedIndex == 0)
            {
                AutoModel.delete(autok[DG_adatok.SelectedIndex].aId);
                autok = AutoModel.select();
                DG_adatok.ItemsSource = autok;
            }
            else if (cb_databases.SelectedIndex == 1)
            {
                GumiModel.delete(gumik[DG_adatok.SelectedIndex].gId);
                gumik = GumiModel.select();
                DG_adatok.ItemsSource = gumik;
            }
            else if (cb_databases.SelectedIndex == 2)
            {
                InfoModel.delete(infok[DG_adatok.SelectedIndex].IID);    
                infok = InfoModel.select();
                DG_adatok.ItemsSource = infok;
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_adatok.Items.Count.ToString();
        }

        private void TB_searchbar_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (cb_databases.SelectedIndex == 0)
            {
                if (TB_searchbar.Text != "")
                {
                    DG_adatok.IsReadOnly = true;
                    var filteredList = autok.Where(x => x.gyarto.ToLower().StartsWith(TB_searchbar.Text) || x.tipus.ToLower().StartsWith(TB_searchbar.Text));
                    DG_adatok.ItemsSource = filteredList;
                    BTN_Delete.IsEnabled = false;
                    BTN_Save.IsEnabled = false;
                }
                else
                {
                    DG_adatok.IsReadOnly = false;
                    DG_adatok.ItemsSource = autok;
                    BTN_Delete.IsEnabled = true;
                    BTN_Save.IsEnabled = true;
                }
            }
            else if (cb_databases.SelectedIndex == 1)
            {
                if (TB_searchbar.Text != "")
                {
                    DG_adatok.IsReadOnly = true;
                    var filteredList = gumik.Where(x => x.gyarto.ToLower().StartsWith(TB_searchbar.Text) || x.evszak.ToLower().StartsWith(TB_searchbar.Text));
                    DG_adatok.ItemsSource = filteredList;
                    BTN_Delete.IsEnabled = false;
                    BTN_Save.IsEnabled = false;
                }
                else
                {
                    DG_adatok.IsReadOnly = false;
                    DG_adatok.ItemsSource = gumik;
                    BTN_Delete.IsEnabled = true;
                    BTN_Save.IsEnabled = true;
                }
            }
            else if (cb_databases.SelectedIndex == 2)
            {
                if (TB_searchbar.Text != "")
                {
                    DG_adatok.IsReadOnly = true;
                    var filteredList = infok.Where(x => x.rendszam.ToLower().StartsWith(TB_searchbar.Text) || x.alvazszam.ToLower().StartsWith(TB_searchbar.Text));
                    DG_adatok.ItemsSource = filteredList;
                    BTN_Delete.IsEnabled = false;
                    BTN_Save.IsEnabled = false;
                }
                else
                {
                    DG_adatok.IsReadOnly = false;
                    DG_adatok.ItemsSource = infok;
                    BTN_Delete.IsEnabled = true;
                    BTN_Save.IsEnabled = true;
                }
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_adatok.Items.Count.ToString();
        }

        private void NumberValidationTextBox(object sender, TextCompositionEventArgs e)
        {
            Regex regex = new Regex("[^0-9]+");
            e.Handled = regex.IsMatch(e.Text);
        }

        private void TB_Rendszam_LostFocus(object sender, RoutedEventArgs e)
        {
            
            if (((TextBox)sender).Text.Length < 7)
            {
                MessageBox.Show("A " + ((TextBox)sender).Name + " mezőbe bevitt értéknek legalább 7 karakter hosszúságúnak kell lennie!", "Figyelmeztetés",MessageBoxButton.OK,MessageBoxImage.Warning);
                ((TextBox)sender).Text = "";
                return;
            }

        }

        private void TB_Alvazszam_LostFocus(object sender, RoutedEventArgs e)
        {
            if (((TextBox)sender).Text.Length < ((TextBox)sender).MaxLength)
            {
                MessageBox.Show("A " + ((TextBox)sender).Name + " mezőbe bevitt értéknek 17 karakter hosszúságúnak kell lennie!", "Figyelmeztetés", MessageBoxButton.OK, MessageBoxImage.Warning);
                ((TextBox)sender).Text = "";
                return;
            }
        }

        private void TB_Evjarat_LostFocus(object sender, RoutedEventArgs e)
        {
            if (TB_Evjarat.Text == "")
            {
                MessageBox.Show("A " + ((TextBox)sender).Name + " mező kitöltése kötelező!", "Figyelmeztetés", MessageBoxButton.OK, MessageBoxImage.Warning);
                ((TextBox)sender).Text = "";
                return;
            }
            else if (Convert.ToInt32(((TextBox)sender).Text) < 1901 || Convert.ToInt32(((TextBox)sender).Text) > 2155)
            {
                MessageBox.Show("A " + ((TextBox)sender).Name + " megadott évnek 1901 és 2155 között kell lennie!", "Figyelmeztetés", MessageBoxButton.OK, MessageBoxImage.Warning);
                ((TextBox)sender).Text = "";
                return;
            }
        }

        
    }
}
