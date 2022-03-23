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

        public MainPage()
        {
            InitializeComponent();

            static void GumiFill(ComboBox CBgumi)
            {
                CBgumi.Items.Add("Nyári");
                CBgumi.Items.Add("Téli");
                CBgumi.Items.Add("Négyévszakos");
                CBgumi.SelectedIndex = 0;
            }

            


            cb_databases.Items.Add("autok");
            cb_databases.Items.Add("gumiabroncs");
            cb_databases.Items.Add("info");
            cb_databases.SelectedIndex = 0;


            GumiFill(CB_GumiEvszak);
            GumiFill(CB_GumiInfo);

            CB_allapot.Items.Add("Alig használt");
            CB_allapot.Items.Add("Frissen felújított");
            CB_allapot.Items.Add("Használt");
            CB_allapot.Items.Add("Enyhén sérült");
            CB_allapot.Items.Add("Sérült");
            CB_allapot.SelectedIndex = 0;

            CB_okmanyok.Items.Add("Érvényes magyar okmányokkal");
            CB_okmanyok.Items.Add("Lejárt magyar okmányokkal");
            CB_okmanyok.Items.Add("Külföldi okmányokkal");
            CB_okmanyok.Items.Add("Okmányok nélkül");
            CB_okmanyok.SelectedIndex = 0;

            CB_Torott.Items.Add("Sérülésmentes");
            CB_Torott.Items.Add("Apró sérülések");
            CB_Torott.Items.Add("Eleje sérült");
            CB_Torott.Items.Add("Hátulja sérült");
            CB_Torott.Items.Add("Súlyosan sérült");
            CB_Torott.SelectedIndex = 0;

            CB_szervkönyv.Items.Add("Nem");
            CB_szervkönyv.Items.Add("Igen");
            CB_szervkönyv.SelectedIndex = 1;

            CB_autoAzon.ItemsSource = autok.Select(x => x.aId);
            CB_autoAzon.SelectedIndex = 0;
            


            autok = AutoModel.select();
            gumik = GumiModel.select();
            infok = InfoModel.select();
            DG_asd.ItemsSource = autok;
            

            LBL_recordCount.Content = "Rekordok száma: " + DG_asd.Items.Count.ToString();


            for (int i = 1; i < 11; i++)
            {
                CB_megbizhatosag.Items.Add(i);
                CB_GumiKategoria.Items.Add(i);
            }
            CB_megbizhatosag.SelectedIndex = 9;
            CB_GumiKategoria.SelectedIndex = 9;


            
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
                DG_asd.ItemsSource = autok;
            }
            else if(cb_databases.SelectedIndex == 1)
            {
                foreach (var item in gumik)
                {
                    GumiModel.update(item.gId, item.gyarto, item.evszak, item.kategoria, item.ar, item.atmero, item.oldalFal, item.szelesseg);
                }
                gumik = GumiModel.select();
                DG_asd.ItemsSource = gumik;
            }
            else if (cb_databases.SelectedIndex == 2)
            {
                foreach (var item in infok)
                {
                    InfoModel.update(item.IID, item.rendszam, item.alvazszam, item.futottKm, item.evJarat, item.allapot,
                        item.szervKonyv, item.okmanyok, item.muszaki, item.GumiAbroncs, item.AutoID, item.kepcim, item.torott);
                    infok = InfoModel.select();
                    DG_asd.ItemsSource = infok;
                }
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_asd.Items.Count.ToString();

        }

        private void BTN_insert_Click(object sender, RoutedEventArgs e)
        {
            if (TB_gyarto.Text == "" || TB_tipus.Text == "" || TB_tipushiba.Text == "")
            {
                LB_uresMezo.IsEnabled = true;
            }
            else
            {
                LB_uresMezo.IsEnabled = false;
                AutoModel.insert(TB_gyarto.Text, TB_tipus.Text, Convert.ToInt32(CB_megbizhatosag.SelectedItem), TB_tipushiba.Text);

                autok = AutoModel.select();
                DG_asd.ItemsSource = autok;
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_asd.Items.Count.ToString();

        }

        private void cb_databases_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (cb_databases.SelectedIndex == 0)
            {
                autok = AutoModel.select();
                DG_asd.ItemsSource = autok;             

                SP_infokInsert.Visibility = Visibility.Collapsed;
                SP_gumikInsert.Visibility = Visibility.Collapsed;
                SP_autokInsert.Visibility = Visibility.Visible;
            }
            if (cb_databases.SelectedIndex == 1)
            {
                gumik = GumiModel.select();
                DG_asd.ItemsSource = gumik;

                SP_infokInsert.Visibility = Visibility.Collapsed;
                SP_autokInsert.Visibility = Visibility.Collapsed;
                SP_gumikInsert.Visibility = Visibility.Visible;
            }
            if (cb_databases.SelectedIndex == 2)
            {
                infok = InfoModel.select();
                DG_asd.ItemsSource = infok;
                CB_autoAzon.ItemsSource = autok.Select(x => x.aId);
                CB_autoAzon.SelectedIndex = 0;

                SP_autokInsert.Visibility = Visibility.Collapsed;
                SP_gumikInsert.Visibility = Visibility.Collapsed;
                SP_infokInsert.Visibility = Visibility.Visible;
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_asd.Items.Count.ToString();
        }

        private void BTN_insertGumi_Click(object sender, RoutedEventArgs e)
        {
            if (TB_GumiGyarto.Text == "" || TB_GumiAr.Text == "" || TB_GumiAtmero.Text == "" || TB_GumiOldalfal.Text == "" || TB_GumiSzelesseg.Text == "")
            {
                LB_GumiuresMezo.IsEnabled = true;
            }
            else
            {
                LB_GumiuresMezo.IsEnabled = false;
                GumiModel.insert(TB_GumiGyarto.Text, CB_GumiEvszak.SelectedItem.ToString(),Convert.ToInt32(CB_GumiKategoria.SelectedItem), int.Parse(TB_GumiAr.Text), Convert.ToInt32(TB_GumiAtmero.Text), Convert.ToInt32(TB_GumiOldalfal.Text), Convert.ToInt32(TB_GumiSzelesseg.Text));

                gumik = GumiModel.select();
                DG_asd.ItemsSource = gumik;
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_asd.Items.Count.ToString();
        }

        private void BTN_insertInfo_Click(object sender, RoutedEventArgs e)
        {
            if (TB_Rendszam.Text == "")
            {                
                LB_InfouresMezo.IsEnabled = true;
            }
            else
            {
                LB_InfouresMezo.IsEnabled = true;
                InfoModel.insert(TB_Rendszam.Text, TB_Alvazszam.Text, Convert.ToInt32(TB_FutottKm.Text), int.Parse(TB_Evjarat.Text), CB_allapot.SelectedItem.ToString(), CB_szervkönyv.SelectedIndex, CB_okmanyok.SelectedItem.ToString(), DP_muszaki.SelectedDate.Value, CB_GumiInfo.SelectedItem.ToString(),
                    Convert.ToInt32(CB_autoAzon.SelectedItem), TB_kepCim.Text, CB_Torott.SelectedItem.ToString());
                //foreach (TextBox textBox in LogicalTreeHelper.GetChildren(SP_infokInsert).OfType<TextBox>())
                //    textBox.Text = "";

                infok = InfoModel.select();
                DG_asd.ItemsSource = infok;
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_asd.Items.Count.ToString();
        }

        private void BTN_Delete_Click(object sender, RoutedEventArgs e)
        {
            if (cb_databases.SelectedIndex == 0)
            {
                AutoModel.delete(autok[DG_asd.SelectedIndex].aId);
                autok = AutoModel.select();
                DG_asd.ItemsSource = autok;
            }
            else if (cb_databases.SelectedIndex == 1)
            {
                GumiModel.delete(gumik[DG_asd.SelectedIndex].gId);
                gumik = GumiModel.select();
                DG_asd.ItemsSource = gumik;
            }
            else if (cb_databases.SelectedIndex == 2)
            {
                InfoModel.delete(infok[DG_asd.SelectedIndex].IID);    
                infok = InfoModel.select();
                DG_asd.ItemsSource = infok;
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_asd.Items.Count.ToString();
        }

        private void TB_searchbar_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (cb_databases.SelectedIndex == 0)
            {
                if (TB_searchbar.Text != "")
                {
                    DG_asd.IsReadOnly = true;
                    var filteredList = autok.Where(x => x.gyarto.ToLower().StartsWith(TB_searchbar.Text) || x.tipus.ToLower().StartsWith(TB_searchbar.Text));
                    DG_asd.ItemsSource = filteredList;
                }
                else
                {
                    DG_asd.ItemsSource = autok;
                }
            }
            else if (cb_databases.SelectedIndex == 1)
            {
                if (TB_searchbar.Text != "")
                {
                    DG_asd.IsReadOnly = true;
                    var filteredList = gumik.Where(x => x.gyarto.ToLower().StartsWith(TB_searchbar.Text) || x.evszak.ToLower().StartsWith(TB_searchbar.Text));
                    DG_asd.ItemsSource = filteredList;
                }
                else
                {
                    DG_asd.ItemsSource = gumik;
                }
            }
            else if (cb_databases.SelectedIndex == 2)
            {
                if (TB_searchbar.Text != "")
                {
                    DG_asd.IsReadOnly = true;
                    var filteredList = infok.Where(x => x.rendszam.ToLower().StartsWith(TB_searchbar.Text) || x.alvazszam.ToLower().StartsWith(TB_searchbar.Text));
                    DG_asd.ItemsSource = filteredList;
                }
                else
                {
                    DG_asd.ItemsSource = infok;
                }
            }
            LBL_recordCount.Content = "Rekordok száma: " + DG_asd.Items.Count.ToString();
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
                MessageBox.Show("You need to write at least 7 characters into " + ((TextBox)sender).Name, "Hiba",MessageBoxButton.OK,MessageBoxImage.Error);
                ((TextBox)sender).Text = "";
                return;
            }

        }

        private void TB_gyarto_TextChanged(object sender, TextChangedEventArgs e)
        {

        }

        private void TB_Alvazszam_LostFocus(object sender, RoutedEventArgs e)
        {
            if (((TextBox)sender).Text.Length < ((TextBox)sender).MaxLength)
            {
                MessageBox.Show("You need to write 17 characters into " + ((TextBox)sender).Name, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                ((TextBox)sender).Text = "";
                return;
            }
        }

        private void TB_Evjarat_LostFocus(object sender, RoutedEventArgs e)
        {
            if (Convert.ToInt32(((TextBox)sender).Text) < 1901 || Convert.ToInt32(((TextBox)sender).Text) > 2155)
            {
                MessageBox.Show("The value of " + ((TextBox)sender).Name + " must be between 1901 and 2155!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                ((TextBox)sender).Text = "";
                return;
            }
        }
    }
}
