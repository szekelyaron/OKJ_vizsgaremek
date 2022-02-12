using CS_MyAdmin.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

namespace CS_MyAdmin
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            


            FRM_Content.Content = new MainPage();
        }

        private void Window_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (e.LeftButton == Mouse.LeftButton)
            {
                this.DragMove();
            }
        }

        private void MI_database1_Click(object sender, RoutedEventArgs e)
        {

        }

        private void MI_database2_Click(object sender, RoutedEventArgs e)
        {

        }
    }
}
