using System;
using System.Collections.Generic;
using System.Text;
using MySql.Data.MySqlClient;
using System.Configuration;
using System.Collections.ObjectModel;

namespace CS_MyAdmin.Models
{
    class InfoModel
    {
        private int _IID;

        public int IID
        {
            get { return _IID; }
            set { _IID = value; }
        }

        private string _rendszam;

        public string rendszam
        {
            get { return _rendszam; }
            set { _rendszam = value; }
        }

        private string _alvazszam;

        public string alvazszam
        {
            get { return _alvazszam; }
            set { _alvazszam = value; }
        }

        private int _futottKm;

        public int futottKm
        {
            get { return _futottKm; }
            set { _futottKm = value; }
        }

        private int _evJarat;

        public int evJarat
        {
            get { return _evJarat; }
            set { _evJarat = value; }
        }

        private string _allapot;

        public string allapot
        {
            get { return _allapot; }
            set { _allapot = value; }
        }

        private int _szervKonyv;

        public int szervKonyv
        {
            get { return _szervKonyv; }
            set { _szervKonyv = value; }
        }

        private string _okmanyok;

        public string okmanyok
        {
            get { return _okmanyok; }
            set { _okmanyok = value; }
        }

        private DateTime _muszaki;

        public DateTime muszaki
        {
            get { return _muszaki; }
            set { _muszaki = value; }
        }

        private string _GumiAbroncs;

        public string GumiAbroncs
        {
            get { return _GumiAbroncs; }
            set { _GumiAbroncs = value; }
        }

        private int _AutoID;

        public int AutoID
        {
            get { return _AutoID; }
            set { _AutoID = value; }
        }

        private string _kepcim;

        public string kepcim
        {
            get { return _kepcim; }
            set { _kepcim = value; }
        }

        private string _torott;

        public string torott
        {
            get { return _torott; }
            set { _torott = value; }
        }


        public InfoModel()
        {

        }

        public InfoModel(MySqlDataReader reader)
        {
            this.IID = Convert.ToInt32(reader["IID"]);
            this.rendszam = reader["Rendszam"].ToString();
            this.alvazszam = reader["Alvazszam"].ToString();
            this.futottKm = Convert.ToInt32(reader["Futottkm"]);
            this.evJarat = Convert.ToInt32(reader["Evjarat"]);
            this.allapot = reader["Allapot"].ToString();
            this.szervKonyv = Convert.ToInt32(reader["VezetettSzervK"]);
            this.okmanyok = reader["Okmanyok"].ToString();
            this.muszaki = Convert.ToDateTime(reader["Muszakierv"]);
            this.GumiAbroncs = reader["Gumiabroncs"].ToString();
            this.AutoID = Convert.ToInt32(reader["Auto_AID"]);
            this.kepcim = reader["Kepcim"].ToString();
            this.torott = reader["Torott"].ToString();


        }

        public static ObservableCollection<InfoModel> select()
        {
            var lista = new ObservableCollection<InfoModel>();

            using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString))
            {
                con.Open();
                var sql = "SELECT * FROM info";
                using (var cmd = new MySqlCommand(sql, con))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            lista.Add(new InfoModel(reader));
                        }
                    }
                }
            }
            return lista;
        }

        public static void update(int id, string rendszam, string alvazszam, int futottKm, int evJarat, string allapot, int szervKonyv, string okmanyok,
            DateTime muszaki, string Gumi, int autoId, string kep, string torott)
        {

            using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString))
            {
                con.Open();
                var sql = "UPDATE `info` SET `IID`=@id,`Rendszam`=@rendszam,`Alvazszam`=@alvazszam,`Futottkm`=@futottKm,`Evjarat`=@evJarat," +
                    "`Allapot`=@allapot,`VezetettSzervK`=@szervKonyv,`Okmanyok`=@okmanyok,`Muszakierv`=@muszaki,`Gumiabroncs`=@Gumi,`Auto_AID`=@autoId,`Kepcim`=@kep, `Torott` =@torott WHERE IID = @id";
                using (var cmd = new MySqlCommand(sql, con))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@rendszam", rendszam);
                    cmd.Parameters.AddWithValue("@alvazszam", alvazszam);
                    cmd.Parameters.AddWithValue("@futottKm", futottKm);
                    cmd.Parameters.AddWithValue("@evJarat", evJarat);
                    cmd.Parameters.AddWithValue("@allapot", allapot);
                    cmd.Parameters.AddWithValue("@szervKonyv", szervKonyv);
                    cmd.Parameters.AddWithValue("@okmanyok", okmanyok);
                    cmd.Parameters.AddWithValue("@muszaki", muszaki);
                    cmd.Parameters.AddWithValue("@Gumi", Gumi);
                    cmd.Parameters.AddWithValue("@autoId", autoId);
                    cmd.Parameters.AddWithValue("@kep", kep);
                    cmd.Parameters.AddWithValue("@torott", torott);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public static void insert(int id, string rendszam, string alvazszam, int futottKm, int evJarat, string allapot, int szervKonyv, string okmanyok,
            DateTime muszaki, string Gumi, int autoId, string kep, string torott)
        {
            using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString))
            {
                con.Open();
                var sql = "INSERT INTO `info`(`IID`, `Rendszam`, `Alvazszam`, `Futottkm`, `Evjarat`, `Allapot`, `VezetettSzervK`, `Okmanyok`, `Muszakierv`, `Gumiabroncs`, `Auto_AID`, `Kepcim`, `Torott`) " +
                    "VALUES ('@id','@rendszam','@alvazszam','@futottKm','@evJarat','@allapot','@szervKonyv','@okmanyok','@muszaki','@Gumi','@autoId','@kep', '@torott')";
                using (var cmd = new MySqlCommand(sql, con))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@rendszam", rendszam);
                    cmd.Parameters.AddWithValue("@alvazszam", alvazszam);
                    cmd.Parameters.AddWithValue("@futottKm", futottKm);
                    cmd.Parameters.AddWithValue("@evJarat", evJarat);
                    cmd.Parameters.AddWithValue("@allapot", allapot);
                    cmd.Parameters.AddWithValue("@szervKonyv", szervKonyv);
                    cmd.Parameters.AddWithValue("@okmanyok", okmanyok);
                    cmd.Parameters.AddWithValue("@muszaki", muszaki);
                    cmd.Parameters.AddWithValue("@Gumi", Gumi);
                    cmd.Parameters.AddWithValue("@autoId", autoId);
                    cmd.Parameters.AddWithValue("@kep", kep);
                    cmd.Parameters.AddWithValue("@torott", torott);


                    cmd.ExecuteNonQuery();
                }

            }
        }









    }
}
