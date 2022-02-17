﻿using System;
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

namespace CS_MyAdmin.Pages
{
    /// <summary>
    /// Interaction logic for MainPage.xaml
    /// </summary>
    public partial class MainPage : Page
    {
        ObservableCollection<AutoModel> autok = new ObservableCollection<AutoModel>();
        ObservableCollection<GumiModel> gumik = new ObservableCollection<GumiModel>();

        public MainPage()
        {
            InitializeComponent();

            cb_databases.Items.Add("autok");
            cb_databases.Items.Add("gumiabroncs");
            cb_databases.SelectedIndex = 0;

            CB_GumiEvszak.Items.Add("Nyári");
            CB_GumiEvszak.Items.Add("Téli");
            CB_GumiEvszak.Items.Add("Négyévszakos");
            CB_GumiEvszak.SelectedIndex = 0;


            autok = AutoModel.select();
            gumik = GumiModel.select();
            DG_asd.ItemsSource = autok;



            

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

        }

        private void cb_databases_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (cb_databases.SelectedIndex == 0)
            {
                autok = AutoModel.select();
                DG_asd.ItemsSource = autok;

                SP_gumikInsert.Visibility = Visibility.Collapsed;
                SP_autokInsert.Visibility = Visibility.Visible;
            }
            if (cb_databases.SelectedIndex == 1)
            {
                gumik = GumiModel.select();
                DG_asd.ItemsSource = gumik;

                SP_autokInsert.Visibility = Visibility.Collapsed;
                SP_gumikInsert.Visibility = Visibility.Visible;
            }
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
        }
    }
}