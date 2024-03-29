"""product: add article

Revision ID: 2e47193bbe9f
Revises: c099540a9976
Create Date: 2024-01-16 20:46:34.627208

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2e47193bbe9f'
down_revision = 'c099540a9976'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('product', sa.Column('article', sa.String(length=50), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('product', 'article')
    # ### end Alembic commands ###
