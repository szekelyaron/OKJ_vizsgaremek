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
            
        }
    }
}
