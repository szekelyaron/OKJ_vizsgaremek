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

namespace CS_MyAdmin.Pages
{
    /// <summary>
    /// Interaction logic for MainPage.xaml
    /// </summary>
    public partial class MainPage : Page
    {
        ObservableCollection<AutoModel> autok = new ObservableCollection<AutoModel>();
        public MainPage()
        {
            InitializeComponent();

            autok = AutoModel.select();
            DG_asd.ItemsSource = autok;

            for (int i = 1; i < 11; i++)
            {
                CB_megbizhatosag.Items.Add(i);
            }
            CB_megbizhatosag.SelectedIndex = 9;
            
        }
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            foreach (var item in autok)
            {
                AutoModel.update(item.aId, item.gyarto, item.tipus, item.megbizhatosag, item.tipusHiba);

            }
            autok = AutoModel.select();
            DG_asd.ItemsSource = autok;
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
    }
}
