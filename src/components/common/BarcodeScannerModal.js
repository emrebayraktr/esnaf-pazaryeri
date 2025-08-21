// src/components/common/BarcodeScannerModal.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import { Close, CameraAlt, QrCodeScanner } from '@mui/icons-material';

const BarcodeScannerModal = ({ open, onClose, onScan }) => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState('');

  const handleScan = () => {
    // Burada gerçek barkod/QR kod okuma API'si entegre edilecek
    // Şimdilik simüle edilmiş veri kullanıyoruz
    setScanning(true);
    
    setTimeout(() => {
      const mockBarcode = '5901234123457'; // Örnek barkod
      setScannedData(mockBarcode);
      setScanning(false);
      
      // 2 saniye sonra otomatik kapat ve veriyi ilet
      setTimeout(() => {
        onScan(mockBarcode);
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleClose = () => {
    setScanning(false);
    setScannedData('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Barkod/QR Kod Okuma</Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          {scanning ? (
            <Box>
              <Typography variant="h6" color="primary" gutterBottom>
                Tarama yapılıyor...
              </Typography>
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  border: '2px dashed',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  my: 2
                }}
              >
                <QrCodeScanner sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
            </Box>
          ) : scannedData ? (
            <Box>
              <Typography variant="h6" color="success.main" gutterBottom>
                Barkod Okundu!
              </Typography>
              <Typography variant="body1" gutterBottom>
                {scannedData}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Ürün aranıyor...
              </Typography>
            </Box>
          ) : (
            <Box>
              <QrCodeScanner sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                Barkod veya QR kodu kameraya okutun
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Ürünleri hızlıca bulmak için barkodunu tarayın
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          İptal
        </Button>
        {!scanning && !scannedData && (
          <Button
            onClick={handleScan}
            variant="contained"
            startIcon={<CameraAlt />}
          >
            Taramayı Başlat
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BarcodeScannerModal;