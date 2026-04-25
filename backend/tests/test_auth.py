from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_login_fail():
    response = client.post("/auth/login", json={
        "email": "wrong@test.com",
        "password": "wrong"
    })
    assert response.status_code == 401


def test_login_success():
    response = client.post("/auth/login", json={
        "email": "admin@vsm.com",
        "password": "admin123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()